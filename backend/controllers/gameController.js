import Game from "../models/Game.js";
import User from "../models/User.js";

// 🔹 Create Game
export const createGame = async (req, res) => {
  try {
    const { sport, turfId, totalPlayers, coinsPerPlayer } = req.body;

    const host = await User.findById(req.user.id);

    const totalCost = totalPlayers * coinsPerPlayer;

    if (host.coins < totalCost) {
      return res.status(400).json({ message: "Not enough coins" });
    }

    // Deduct full amount from host
    host.coins -= totalCost;
    await host.save();

    const game = await Game.create({
      sport,
      turf: turfId,
      host: host._id,
      players: [host._id],
      totalPlayers,
      coinsPerPlayer,
    });

    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Join Game
export const joinGame = async (req, res) => {
  try {
    const { gameId } = req.body;

    const game = await Game.findById(gameId);
    const user = await User.findById(req.user.id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    if (game.players.includes(user._id)) {
      return res.status(400).json({ message: "Already joined" });
    }

    if (game.players.length >= game.totalPlayers) {
      return res.status(400).json({ message: "Game full" });
    }

    if (user.coins < game.coinsPerPlayer) {
      return res.status(400).json({ message: "Not enough coins" });
    }

    // Deduct coins
    user.coins -= game.coinsPerPlayer;
    await user.save();

    game.players.push(user._id);

    if (game.players.length === game.totalPlayers) {
      game.status = "confirmed";
    }

    await game.save();

    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get All Games
export const getGames = async (req, res) => {
  try {
    const games = await Game.find()
      .populate("turf", "name location")
      .populate("host", "name")
      .populate("players", "name");

    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
