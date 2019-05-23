import React from "react";
import ReactDOM from "react-dom";
import { Lobby } from "boardgame.io/react";
import { Ra } from "./game/game";
import RaBoard from "./board/board";

ReactDOM.render(
  <div>
    <Lobby
      gameServer="http://localhost:5000"
      lobbyServer="http://localhost:5000"
      gameComponents={[{ game: Ra, board: RaBoard }]}
    />
  </div>,
  document.getElementById("root")
);
