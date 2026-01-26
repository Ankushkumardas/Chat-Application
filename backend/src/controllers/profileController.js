import User from "../models/User.js";
import bcryptjs from "bcryptjs";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const { name, email, oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    // ---------- Update name/email ----------
    if (name) user.name = name;
    if (email) user.email = email;

    // ---------- Update password (if requested) ----------
    if (oldPassword || newPassword) {
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both oldPassword and newPassword are required", success: false });
      }

      const isMatch = await bcryptjs.compare(
        oldPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(401).json({ message: "Old password is incorrect", success: false });
      }

      if (newPassword.length < 4) {
        return res.status(400).json({ message: "Password must be at least 6 characters", success: false });
      }

      const salt = await bcryptjs.genSalt(12);
      user.password = await bcryptjs.hash(newPassword, salt);

      // logout all devices
      user.refreshToken = null;
    }

    await user.save();

    res.json({ message: "Profile updated successfully", user: { id: user._id, name: user.name, email: user.email }, success: true });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error", success: false });
  }
};
