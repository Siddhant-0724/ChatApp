import mongoose from "mongoose";
import User from "../models/Auth.Model.js";
import Message from "../models/Message.Model.js";
export const searchContact = async (req, res, next) => {
  try {
    // Extract and validate input
    const { searchTerm } = req.body;

    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).send("Search term is required.");
    }

    // Sanitize input by escaping special regex characters
    const sanitizedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    // Build regex for case-insensitive search
    const regex = new RegExp(sanitizedSearchTerm, "i");

    // Perform search query excluding the current user
    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.userId } }, // Exclude the current user
        {
          $or: [
            { firstName: regex }, // Match first name
            { lastName: regex }, // Match last name
            { email: regex }, // Match email
          ],
        },
      ],
    });

    // Return the search results
    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).send("Internal server error.");
  }
};

export const getContactForDmList = async (req, res, next) => {
  try {
    // Convert userId to ObjectId
    const userId = new mongoose.Types.ObjectId(req.userId);

    const contacts = await Message.aggregate([
      // Match messages where the user is either sender or recipient
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      // Sort by latest timestamp
      { $sort: { timestamp: -1 } },
      // Group by the other user (either sender or recipient)
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recipient", // If the user is sender, group by recipient
              else: "$sender", // Otherwise, group by sender
            },
          },
          lastMessageTime: { $first: "$timestamp" }, // Get the latest timestamp
        },
      },
      // Lookup user information
      {
        $lookup: {
          from: "users", // Corrected lookup stage
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      { $unwind: "$contactInfo" }, // Flatten the lookup result
      // Project the required fields
      {
        $project: {
          _id: 1,
          lastMessageTime: 1,
          email: "$contactInfo.email",
          firstName: "$contactInfo.firstName",
          lastName: "$contactInfo.lastName",
          image: "$contactInfo.image",
          color: "$contactInfo.color",
        },
      },
      // Final sort by last message time
      { $sort: { lastMessageTime: -1 } },
    ]);

    // Return the results
    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).send("Internal server error.");
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const users = await User.find(
      { _id: { $ne: req.userId } },
      "firstName lastName _id"
    );

    const contacts = users.map((user) => ({
      label: user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
      value:user._id
    }));
    return res.status(200).json({ contacts });
  } catch (error) {
    console.error("Search Error:", error);
    return res.status(500).send("Internal server error.");
  }
};
