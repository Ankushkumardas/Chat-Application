import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userId = req.user._id || req.user.id;
    const newdata = await User.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Profile updated", user: newdata, success: true });
  } catch (error) {
    console.error("Update profile error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
