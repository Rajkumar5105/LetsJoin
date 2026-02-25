// routes/turfRoutes.js

import express from "express";
import { getTurfs, createTurf } from "../controllers/turfController.js";

const router = express.Router();

// Get all turfs
router.get("/", getTurfs);

// Create turf (for testing)
router.post("/", createTurf);

export default router;
