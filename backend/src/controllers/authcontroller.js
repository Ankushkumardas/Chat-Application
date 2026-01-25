import { sendmail } from "../helper/nodemailer.js";
import { comparepassword, generateToken, verifytoken } from "../lib/utils.js";
import { generateRefreshToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required to be filled to register",
        success: false,
      });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "User with this email is already registered",
        success: false,
      });
    }
    const hashpass = await bcryptjs.hash(password, 12);
    const newuser = await User.create({ email, password: hashpass, name });
    if (newuser) {
      const token = generateToken(newuser, res);
      const link = `http://localhost:3000/verify-email?token=${token}`;
      await sendmail({
        to: email,
        subject: "Registration email verification link",
        html: `<h2>Verify Email</h2>
    <p>Click below:</p>
    <a href="${link}">Verify Email</a>`,
      });
      return res.status(200).json({
        message: "User registration is successful",
        data: newuser,
        token,
        success: true,
      });
    } else {
      return res.status(500).json({
        message: "Failed to create user",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required to login", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User with this email does not exist",
        success: false,
      });
    }
    if (!user.isEmailVerified) {
      return res.status(403).json({
        message:
          "Email is not verified. Please verify your email before logging in.",
        success: false,
      });
    }
    const verifypass = await comparepassword(password, user.password);
    if (!verifypass) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    user.refreshToken = refreshToken;
    await user.save();
    res.status(200).json({
      message: "Login successful",
      success: true,
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    await User.findByIdAndUpdate(payload.id, {
      refreshToken: null,
    });
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
};

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Refresh token missing", success: false });
  }
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const newAccessToken = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    user.refreshToken = newRefreshToken;
    await user.save();
    return res.status(200).json({
      message: "Access token refreshed",
      success: true,
      user,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token", success: false });
  }
};

export const verifyemail = async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res
      .status(400)
      .json({ message: "Verification token is required", success: false });
  }
  try {
    console.log("Token received for verification:", token);
    const payload = verifytoken(token);
    if (!payload || !payload.id) {
      console.error("Invalid or expired token:", token);
      return res
        .status(400)
        .json({ message: "Invalid or expired token", success: false });
    }
    const user = await User.findById(payload.id);
    if (!user) {
      console.error("User not found for id:", payload.id);
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    if (user.isEmailVerified) {
      return res
        .status(200)
        .json({ message: "Email already verified", success: true, user });
    }
    user.isEmailVerified = true;
    await user.save();
    console.log("Email verified", user);
    return res.status(200).json({
      message: "User email verified successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const checkauth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
