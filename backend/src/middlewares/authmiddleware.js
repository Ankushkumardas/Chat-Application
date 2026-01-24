import { verifytoken } from "../lib/utils.js";

export const authMiddleware = async (req, res, next) => {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided", success: false });
  }
  const token = authheader.split(" ")[1];
  try {
    const decode = verifytoken(token);
    req.user = decode;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};
