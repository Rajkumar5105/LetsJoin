// models/Turf.js

import mongoose from "mongoose";

const turfSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    sport: {
      type: String,
      enum: ["cricket", "football", "pickleball"],
      required: true,
    },

    pricePerSlot: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Turf = mongoose.model("Turf", turfSchema);

export default Turf;
