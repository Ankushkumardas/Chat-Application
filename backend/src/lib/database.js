import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URL);
    if (res) {
      console.log("Database connection is successfull");
    } else {
      console.log("Connection error with backend Database");
    }
  } catch (error) {
    console.log("Databse connection error", error);
  }
};
