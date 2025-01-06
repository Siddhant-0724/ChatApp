import { Router } from "express";
import {
  login,
  signUp,
  getUserInfo,
  updateProfile,
  addProfileImg,
  deleteProfileImg,
  logout,
} from "../controllers/Auth.Controller.js";
import { verifyToken } from "../middleware/Auth.Middleware.js";
import multer from "multer";
const authRoutes = Router();

const upload = multer({ dest: "uploads/profiles/" });

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-img",
  verifyToken,
  upload.single("profile-image"),
  addProfileImg
);
authRoutes.delete("/remove-profile-img", verifyToken, deleteProfileImg);
authRoutes.post("/logout",logout);

export default authRoutes;
