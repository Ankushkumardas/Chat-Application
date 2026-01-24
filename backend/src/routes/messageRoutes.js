import express from "express";
import { authMiddleware } from "../middlewares/authmiddleware.js";
import { getallmessages, getallusers, sendmessage } from "../controllers/messageController.js";

const router = express.Router();
router.get("/users", authMiddleware, getallusers);
router.get("/:id", authMiddleware, getallmessages);
router.post("/send/:id", authMiddleware, sendmessage);
export default router;
