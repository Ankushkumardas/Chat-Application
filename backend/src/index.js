
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import { connectDB } from "./lib/database.js";
import cookieParser from "cookie-parser";
import messageRoutes from './routes/messageRoutes.js'
const app = express();
app.use(express.json());
app.use(cookieParser())

//routes
app.use('/api/auth',authRoutes);
app.use('/api/user',profileRoutes)
app.use('/api/message',messageRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server started at port",process.env.PORT);
  connectDB();
});
