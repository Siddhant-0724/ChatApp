import jwt from "jsonwebtoken";
import User from "../models/Auth.Model.js";
import bcrypt from "bcryptjs";
import path from "path";
import { renameSync, unlinkSync } from "fs";
const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

// Generate JWT Token
const createToken = (email, userId) => {
  return jwt.sign(
    { email, userId }, // Payload
    process.env.JWT_KEY, // Secret key
    { expiresIn: maxAge } // Expiry time
  );
};

export const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // Create user
    const user = await User.create({ email, password });

    // Create token
    const token = createToken(email, user._id);

    // Set cookie with token
    res.cookie("jwt", token, {
      maxAge,
    });

    // Return success response
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // Create user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User with given credential not found");
    }

    const auth = bcrypt.compareSync(password, user.password);
    if (!auth) {
      return res.status(400).send("Password is Incorrect");
    }
    // Create token
    const token = createToken(email, user._id);

    // Set cookie with token
    res.cookie("jwt", token, {
      maxAge,
    });

    // Return success response
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        color: user.color,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).send("User with given email not exits");
    }
    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.error({ error });
    return res.status(500).send("Internal server error");
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;
    if (!firstName || !lastName) {
      return res.status(400).send("firstName lastName color are required");
    }
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.error({ error });
    return res.status(500).send("Internal server error");
  }
};



export const addProfileImg = async (req, res, next) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    // Generate file name with a timestamp for uniqueness
    const timestamp = Date.now();
    const ext = path.extname(req.file.originalname); // Extract file extension
    const sanitizedFilename = path.basename(req.file.originalname, ext).replace(/\s+/g, "_"); // Sanitize filename
    const fileName = `uploads/profiles/${timestamp}_${sanitizedFilename}${ext}`;

    // Move file to the desired directory
    renameSync(req.file.path, fileName);

    // Update user with the new profile image path
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { image: fileName },
      { new: true, runValidators: true }
    );

    // Return success response
    return res.status(200).json({
      message: "Profile image updated successfully.",
      image: updatedUser.image
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);

    // Return specific error responses for known issues
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error occurred." });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    // Fallback for unexpected errors
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteProfileImg = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId)
    if(!user){
      return res.status(404).send("User not found")
    }
    if(user.image){
      unlinkSync(user.image)
    }
    user.image = null;
    await user.save()

    return res.status(200).send("Profile image Remove")
  } catch (error) {
    console.error({ error });
    return res.status(500).send("Internal server error");
  }
};

export const logout = async (req, res, next) => {
  try {
   res.cookie("jwt","",{maxAge:1,})
    return res.status(200).send("Logout Sucessfull")
  } catch (error) {
    console.error({ error });
    return res.status(500).send("Internal server error");
  }
};
