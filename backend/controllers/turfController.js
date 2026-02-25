import Turf from "../models/Turf.js";

// 🔹 Get All Turfs
export const getTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find();
    res.json(turfs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Create Dummy Turf (Optional for testing)
export const createTurf = async (req, res) => {
  try {
    const { name, location, sport, pricePerSlot } = req.body;

    const turf = await Turf.create({
      name,
      location,
      sport,
      pricePerSlot,
    });

    res.status(201).json(turf);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
