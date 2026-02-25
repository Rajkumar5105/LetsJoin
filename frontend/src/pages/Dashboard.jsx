// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const [coins, setCoins] = useState(0);
//   const [turfs, setTurfs] = useState([]);
//   const [games, setGames] = useState([]);

//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchProfile();
//     fetchTurfs();
//     fetchGames();
//   }, []);

//   const fetchProfile = async () => {
//     const res = await axios.get("/users/profile", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setCoins(res.data.coins);
//   };

//   const fetchTurfs = async () => {
//     const res = await axios.get("/turfs");

//     const withDistance = res.data
//       .map((turf, index) => ({
//         ...turf,
//         distance: (index + 1) * 1.3,
//       }))
//       .sort((a, b) => a.distance - b.distance);

//     setTurfs(withDistance);
//   };

//   const fetchGames = async () => {
//     const res = await axios.get("/games");
//     setGames(res.data);
//   };

//   const handleJoin = async (gameId) => {
//     await axios.post(
//       "/games/join",
//       { gameId },
//       { headers: { Authorization: `Bearer ${token}` } },
//     );

//     fetchProfile();
//     fetchGames();
//   };

//   return (
//     <div className="min-h-screen w-screen bg-[#0f1115] text-gray-200">
//       {/* NAVBAR */}
//       <div className="border-b border-gray-800 px-8 py-4 flex justify-between items-center">
//         <h1 className="text-xl font-semibold tracking-wide text-white">
//           LetsJoin
//         </h1>

//         <div className="flex items-center gap-6">
//           <div className="text-sm text-gray-400">
//             Balance
//             <span className="ml-2 text-green-400 font-semibold">
//               {coins} coins
//             </span>
//           </div>

//           <button
//             onClick={() => navigate("/create")}
//             className="text-white px-4 py-2 rounded-lg font-medium hover:bg-white transition"
//           >
//             Create Game
//           </button>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="px-8 py-10">
//         {/* Turfs Section */}
//         <div className="mb-12">
//           <h2 className="text-lg font-medium text-white mb-6">Nearby Turfs</h2>

//           <div className="grid md:grid-cols-3 gap-6">
//             {turfs.map((turf) => (
//               <div
//                 key={turf._id}
//                 className="bg-[#1a1d23] border border-gray-800 p-6 rounded-xl hover:border-green-400 transition"
//               >
//                 <h3 className="text-lg font-semibold text-white">
//                   {turf.name}
//                 </h3>

//                 <p className="text-sm text-gray-400 mt-1">{turf.location}</p>

//                 <div className="flex justify-between items-center mt-6 text-sm">
//                   <span className="text-gray-500">
//                     {turf.distance.toFixed(1)} km
//                   </span>

//                   <span className="text-gray-300 font-medium">
//                     ₹{turf.pricePerSlot}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Games Section */}
//         <div>
//           <h2 className="text-lg font-medium text-white mb-6">Open Games</h2>

//           <div className="grid md:grid-cols-3 gap-6">
//             {games.map((game) => (
//               <div
//                 key={game._id}
//                 className="bg-[#1a1d23] border border-gray-800 p-6 rounded-xl hover:border-green-400 transition"
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-semibold capitalize">{game.sport}</h3>

//                   <span
//                     className={`text-xs px-3 py-1 rounded-full ${
//                       game.status === "confirmed"
//                         ? "bg-green-500/20 text-green-400"
//                         : "bg-yellow-500/20 text-yellow-400"
//                     }`}
//                   >
//                     {game.status}
//                   </span>
//                 </div>

//                 <div className="mt-4 text-sm text-gray-400">
//                   Players: {game.players.length}/{game.totalPlayers}
//                 </div>

//                 <div className="mt-1 text-sm text-gray-400">
//                   Entry: {game.coinsPerPlayer} coins
//                 </div>

//                 {game.status === "waiting" && (
//                   <button
//                     onClick={() => handleJoin(game._id)}
//                     className="mt-6 w-full bg-green-500 text-black py-2 rounded-lg font-medium hover:bg-green-400 transition"
//                   >
//                     Join Game
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [coins, setCoins] = useState(0);
  const [turfs, setTurfs] = useState([]);
  const [games, setGames] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
    fetchTurfs();
    fetchGames();
  }, []);

  const fetchProfile = async () => {
    const res = await axios.get("/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCoins(res.data.coins);
  };

  const fetchTurfs = async () => {
    const res = await axios.get("/turfs");

    const withDistance = res.data
      .map((turf, index) => ({
        ...turf,
        distance: (index + 1) * 1.3,
      }))
      .sort((a, b) => a.distance - b.distance);

    setTurfs(withDistance);
  };

  const fetchGames = async () => {
    const res = await axios.get("/games");
    setGames(res.data);
  };

  const handleJoin = async (gameId) => {
    await axios.post(
      "/games/join",
      { gameId },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    fetchProfile();
    fetchGames();
  };

return (
  <div className="min-h-screen w-screen bg-[#0b0d11] text-gray-200">
    {/* NAVBAR */}
    <div className="bg-[#12151b] border-b border-gray-800 px-8 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold tracking-wide text-white">
        LetsJoin
      </h1>

      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-400">
          Balance
          <span className="ml-2 text-green-400 font-semibold">
            {coins} coins
          </span>
        </div>

        <button
          onClick={() => navigate("/create")}
          className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-5 py-2 rounded-lg font-medium 
             hover:bg-white hover:shadow-lg hover:shadow-green-500/30
             transition-all duration-200"
        >
          Create Gam
        </button>
      </div>
    </div>

    {/* CONTENT */}
    <div className="px-8 py-10 bg-[#0f1116] min-h-[calc(100vh-72px)]">
      {/* Turfs Section */}
      <div className="mb-14">
        <h2 className="text-lg font-medium text-white mb-6">Nearby Turfs</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {turfs.map((turf) => (
            <div
              key={turf._id}
              className="bg-[#171a21] border border-gray-800 p-6 rounded-xl 
                         hover:border-green-400 hover:shadow-lg 
                         hover:shadow-green-500/10 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-white">{turf.name}</h3>

              <p className="text-sm text-gray-400 mt-1">{turf.location}</p>

              <div className="flex justify-between items-center mt-6 text-sm">
                <span className="text-gray-500">
                  {turf.distance.toFixed(1)} km
                </span>

                <span className="text-gray-300 font-medium">
                  ₹{turf.pricePerSlot}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Games Section */}
      <div>
        <h2 className="text-lg font-medium text-white mb-6">Open Games</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game._id}
              className="bg-[#171a21] border border-gray-800 p-6 rounded-xl 
                         hover:border-green-400 hover:shadow-lg 
                         hover:shadow-green-500/10 transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold capitalize">{game.sport}</h3>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    game.status === "confirmed"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {game.status}
                </span>
              </div>

              <div className="mt-4 text-sm text-gray-400">
                Players: {game.players.length}/{game.totalPlayers}
              </div>

              <div className="mt-1 text-sm text-gray-400">
                Entry: {game.coinsPerPlayer} coins
              </div>

              {game.status === "waiting" && (
                <button
                  onClick={() => handleJoin(game._id)}
                  className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-300 text-white py-2 rounded-lg font-medium 
             hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/30
             transition-all duration-200"
                >
                  Join Game
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}

export default Dashboard;


