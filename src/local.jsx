import React from "react";
import ReactDOM from "react-dom";
import { Client } from "boardgame.io/react";
import { Ra } from "./game/game.ts";
import RaBoard from "./board/board";
import RaAI from "./game/ai";

const RaClient = Client({
  numPlayers: 2,
  game: Ra,
  board: RaBoard,
  ai: RaAI,
  debug: true
});

ReactDOM.render(
  <div>
    <RaClient />
  </div>,
  document.getElementById("root")
);
