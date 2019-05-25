import React from "react";
import ReactDOM from "react-dom";
import { Lobby } from "boardgame.io/react";
import { Ra } from "./game/game";
import RaBoard from "./board/board";

ReactDOM.render(
  <div>
    <Lobby
      gameServer="https://mgrau.dev:5002"
      lobbyServer="https://mgrau.dev/ra-lobby"
      gameComponents={[{ game: Ra, board: RaBoard }]}
    />
  </div>,
  document.getElementById("root")
);
