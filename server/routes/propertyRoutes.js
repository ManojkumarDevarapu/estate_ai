import express from "express";
import {
  analyzeAndCreateProperty,
  getUserProperties,
  deleteProperty,
} from "../controllers/propertyController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// POST → Analyze property + save (USER-SPECIFIC)
router.post("/analyze", protect, analyzeAndCreateProperty);

// GET → Fetch logged-in user's history
router.get("/", protect, getUserProperties);

// DELETE → Delete property (OWNER ONLY)
router.delete("/:id", protect, deleteProperty);

export default router;
