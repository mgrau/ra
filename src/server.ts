import { Server } from "boardgame.io/server";
import { Ra } from "./game/game";

const server = Server({ games: [Ra] });
server.run(5001);
