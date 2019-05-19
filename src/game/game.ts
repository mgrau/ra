import { Game } from "boardgame.io/core";
import { draw, invoke, god, pass, bid, discard } from "./moves";
import Tiles, { Tile } from "./tile";
import StartingSuns from "./suns";
import AuctionEnd from "./auction";
import TurnOrder from "./order";
import Setup, { GameState } from "./setup";

export const Ra = Game({
  setup: ctx =>
    Setup(
      ctx.random.Shuffle(StartingSuns(ctx.numPlayers)),
      ctx.random.Shuffle(Tiles())
    ),
  moves: {
    draw,
    invoke,
    god,
    pass,
    bid,
    discard
  },
  flow: {
    startingPhase: "Action",
    endTurn: false,
    endPhase: false,
    phases: {
      Action: {
        // movesPerTurn: 1,
        allowedMoves: ["draw", "invoke", "god"]
      },
      Auction: {
        // movesPerTurn: 1,
        allowedMoves: ["pass", "bid"],
        endPhaseIf: (G: GameState, ctx) =>
          G.players.every(
            player =>
              player.bid != null || player.pass || player.suns.length == 0
          ),
        onPhaseEnd: (G: GameState, ctx) => AuctionEnd(G, ctx)
      },
      Discard: {
        allowedMoves: ["discard"]
      }
    },
    turnOrder: TurnOrder
  }
});
