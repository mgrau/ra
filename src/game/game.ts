import { Game, IGameCtx } from "boardgame.io/core";
import { draw, invoke, god, pass, bid } from "./moves";
import Tiles from "./tile";
import StartingSuns from "./suns";
import AuctionEnd from "./auction";
import TurnOrder from "./order";
import Setup, { GameState } from "./setup";

export const Ra = Game({
  setup: (ctx: IGameCtx) =>
    Setup(
      ctx.random.Shuffle(StartingSuns(ctx.numPlayers)),
      ctx.random.Shuffle(Tiles())
    ),
  moves: {
    draw,
    invoke,
    god,
    pass,
    bid
  },
  flow: {
    startingPhase: "Action",
    endTurn: false,
    endPhase: false,
    phases: {
      Action: {
        movesPerTurn: 1,
        allowedMoves: ["draw", "invoke", "god"]
      },
      Auction: {
        movesPerTurn: 1,
        allowedMoves: ["pass", "bid"],
        endPhaseIf: (G: GameState, ctx) =>
          G.players.every(
            player =>
              player.bid != null || player.pass || player.suns.length == 0
          ),
        onPhaseEnd: (G: GameState, ctx) => AuctionEnd(G, ctx)
      }
    },
    turnOrder: TurnOrder
  }
});
