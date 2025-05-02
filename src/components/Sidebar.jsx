import React from "react";

const players = [
  {
    name: "yuurih",
    twitch: "https://www.twitch.tv/yuurih",
    image: "src/assets/800px-Yuurih_at_PGL_Bucharest_2025.jpg", 
  },
  {
    name: "falleN",
    twitch: "https://www.twitch.tv/gafallen",
    image: "src/assets/FalleN_at_PGL_Bucharest_2025.jpg",
  },
  {
    name: "molodoy",
    twitch: "https://www.twitch.tv/molodoy1818",
    image: "src/assets/AMKAL_molodoy_March_2025.png",
  },
];

const games = [
  {
    name: "CS2",
    image: "src/assets/cs2.ico",
  },
  {
    name: "Valorant",
    image: "src/assets/valorant.png",
  },
  {
    name: "LoL",
    image: "src/assets/882137f311c5728f8e257e56820af92c.png",
  },
];

export default function Sidebar() {
  return (
    <div className="w-1/3 bg-black text-white p-6 space-y-8 shadow-lg border-r border-gray-800 overflow-y-auto">
      <img
        src="src\assets\Furia_Esports_logo.png"
        alt="FURIA Logo"
        className="w-28 mx-auto mb-6"
      />

      <div>
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">🎮 Jogos</h2>
        <ul className="space-y-3">
          {games.map((game, i) => (
            <li key={i} className="flex items-center space-x-4">
              <img
                src={game.image}
                alt={game.name}
                className="w-10 h-10 rounded object-cover bg-gray-700"
              />
              <span className="text-lg font-medium">{game.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mt-6 mb-4 border-b border-gray-700 pb-2">👥 Jogadores Ativos Agora</h2>
        <ul className="space-y-4">
          {players.map((player, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-10 h-10 rounded-full object-cover bg-gray-700"
                />
                <span className="text-md font-medium">{player.name}</span>
              </div>
              <a
                href={player.twitch}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded"
              >
                Twitch
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
