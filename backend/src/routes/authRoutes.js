import express from "express";
import {
  checkauth,
  login,
  logout,
  signup,
  verifyemail,
} from "../controllers/authcontroller.js";
import { refreshAccessToken } from "../controllers/authcontroller.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify-email", verifyemail);
router.post("/refresh-token", refreshAccessToken);
router.get("/check", authMiddleware, checkauth);

export default router;
