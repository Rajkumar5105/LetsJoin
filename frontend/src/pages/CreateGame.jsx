import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreateGame() {
  const [sport, setSport] = useState("cricket");
  const [turfId, setTurfId] = useState("");
  const [totalPlayers, setTotalPlayers] = useState(6);
  const [coinsPerPlayer, setCoinsPerPlayer] = useState(200);
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const calculateDefaultCoins = (price, players) => {
    if (!price || !players) return 0;
    return Math.ceil(price / players);
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    try {
        const res = await axios.get("/turfs");
        setTurfs(res.data);

        if (res.data.length > 0) {
        const firstTurf = res.data[0];
        setTurfId(firstTurf._id);
        setCoinsPerPlayer(
            calculateDefaultCoins(firstTurf.pricePerSlot, totalPlayers),
        );
        }
    } catch (err) {
        console.error(err);
    }
  }; 

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "/games/create",
        {
          sport,
          turfId,
          totalPlayers,
          coinsPerPlayer,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      navigate("/dashboard");
    } catch (err) {
      alert("Failed to create game");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#0b0d11] text-gray-200 flex justify-center items-center px-4">
      <div className="bg-[#171a21] border border-gray-800 rounded-xl p-8 w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Create New Game
        </h2>

        <form onSubmit={handleCreate} className="space-y-5">
          {/* Sport */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Sport</label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full bg-[#0f1116] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-400"
            >
              <option value="cricket">Cricket</option>
              <option value="football">Football</option>
              <option value="pickleball">Pickleball</option>
            </select>
          </div>

          {/* Turf */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Select Turf
            </label>
            <select
              value={turfId}
              onChange={(e) => setTurfId(e.target.value)}
              className="w-full bg-[#0f1116] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-400"
            >
              {turfs.map((turf) => (
                <option key={turf._id} value={turf._id}>
                  {turf.name} - {turf.location}
                </option>
              ))}
            </select>
          </div>

          {/* Total Players */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Total Players
            </label>
            <input
              type="number"
              min="2"
              value={totalPlayers}
              onChange={(e) => {
                const players = Number(e.target.value);
                setTotalPlayers(players);

                const selectedTurf = turfs.find((t) => t._id === turfId);
                if (selectedTurf) {
                  setCoinsPerPlayer(
                    calculateDefaultCoins(selectedTurf.pricePerSlot, players),
                  );
                }
              }}
              className="w-full bg-[#0f1116] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-400"
            />
          </div>

          {/* Coins Per Player */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Coins Per Player
            </label>
            <input
              type="number"
              min="1"
              value={coinsPerPlayer}
              onChange={(e) => setCoinsPerPlayer(Number(e.target.value))}
              className="w-full bg-[#0f1116] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-green-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium 
                       hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/30
                       transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Game"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGame;
