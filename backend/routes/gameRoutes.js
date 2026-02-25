// routes/gameRoutes.js

import express from "express";
import {
  createGame,
  joinGame,
  getGames,
} from "../controllers/gameController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all games
router.get("/", getGames);

// Create game
router.post("/create", protect, createGame);

// Join game
router.post("/join", protect, joinGame);

export default router;
