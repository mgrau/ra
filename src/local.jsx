import React from "react";
import ReactDOM from "react-dom";
import { Client } from "boardgame.io/react";
import { Ra } from "./game/game.ts";
import RaBoard from "./board/board";

// import "./board/css/lobby.css";

const RaClient = Client({
  numPlayers: 2,
  game: Ra,
  board: RaBoard,
    // multiplayer: { server: "http://localhost:5000" },
  debug: true
});

ReactDOM.render(
  <div>
    <RaClient />
  </div>,
  document.getElementById("root")
);
