// models/Game.js

import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    sport: {
      type: String,
      enum: ["cricket", "football", "pickleball"],
      required: true,
    },

    turf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turf",
      required: true,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    totalPlayers: {
      type: Number,
      required: true,
    },

    coinsPerPlayer: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["waiting", "confirmed", "completed"],
      default: "waiting",
    },
  },
  { timestamps: true },
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
