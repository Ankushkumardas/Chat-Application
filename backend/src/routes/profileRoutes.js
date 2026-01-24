import express from 'express';
import { updateProfile } from '../controllers/profileController.js';
import { authMiddleware } from '../middlewares/authmiddleware.js';

const router=express.Router();

router.put("/update-profile",authMiddleware,updateProfile)

export default router;