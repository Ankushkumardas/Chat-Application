import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const generateToken = (data) => {
  return jwt.sign({ id: data._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

// Refresh token (longer-lived)
export const generateRefreshToken = (data) => {
  return jwt.sign({ id: data._id }, process.env.JWT_REFRESH_SECRET);
};

export const verifytoken=(payload)=>{
  const token=jwt.verify(payload,process.env.JWT_SECRET);
  return token;
}

export const comparepassword=(newpass,pass)=>{
  const verify=bcrypt.compare(newpass,pass);
    return verify
}