import { Game, IGameCtx } from "boardgame.io/core";
import { draw, invoke, god, pass, bid, discard } from "./moves";
import Tiles, { Tile } from "./tile";
import StartingSuns from "./suns";
import AuctionEnd from "./auction";
import TurnOrder from "./order";
import Setup, { GameState } from "./setup";
import StripSecrets from "./secrets";

export const Ra = Game({
  name: "ra",
  minPlayers: 2,
  maxPlayers: 5,
  setup: (ctx: IGameCtx) =>
    Setup(
      ctx.random.Shuffle(StartingSuns(ctx.numPlayers)),
      ctx.random.Shuffle(Tiles())
    ),
  playerView: (G: GameState, ctx: IGameCtx, playerID: string) => {
    return StripSecrets(G, playerID);
  },
  moves: {
    draw,
    invoke,
    god,
    pass,
    bid,
    discard
  },
  flow: {
    startingPhase: "Draw",
    endTurn: false,
    endPhase: false,
    phases: {
      Draw: {
        movesPerTurn: 1,
        allowedMoves: ["draw", "invoke", "god"]
      },
      Auction: {
        movesPerTurn: 1,
        allowedMoves: ["pass", "bid"],
        endPhaseIf: (G: GameState, ctx: IGameCtx) =>
          G.players.every(
            player =>
              player.bid != null || player.pass || player.suns.length == 0
          ),
        onPhaseEnd: (G: GameState, ctx: IGameCtx) => AuctionEnd(G, ctx)
      },
      Discard: {
        allowedMoves: ["discard"]
      },
      EndEpoch: {
        allowedMoves: []
      }
    },
    turnOrder: TurnOrder
  }
});
