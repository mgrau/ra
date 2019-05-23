const Server = require("boardgame.io/server").Server;
const Ra = require("./game/game").Ra;
const server = Server({ games: [Ra] });
server.run(6000);
