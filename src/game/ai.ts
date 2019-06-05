import { AI } from "boardgame.io/ai";
import { GameState } from "./setup";
import { IGameCtx } from "boardgame.io/core";
import { canPass } from "./moves";
import { TileType } from "./tile";

const RaAI = AI({
  enumerate: (G: GameState, ctx: IGameCtx) => {
    let moves = [];
    if (ctx.allowedMoves.includes("draw")) {
      if (G.auctionTrack.length < 8) {
        moves.push({ move: "draw" });
      }
    }
    if (ctx.allowedMoves.includes("invoke")) {
      moves.push({ move: "invoke" });
    }
    if (ctx.allowedMoves.includes("pass")) {
      if (canPass(G, ctx)) {
        moves.push({ move: "pass" });
      }
    }
    if (ctx.allowedMoves.includes("bid")) {
      G.players[ctx.currentPlayer].suns.forEach(sun => {
        moves.push({ move: "bid", args: [sun] });
      });
    }
    if (ctx.allowedMoves.includes("discard")) {
      if (G.discard.civilization > 0) {
        G.players[ctx.currentPlayer].tiles
          .filter(tile => tile.tileType == TileType.Civilization)
          .forEach(tile => {
            moves.push({ move: "discard", args: [tile.subType] });
          });
      }
      if (G.discard.monument > 0) {
        G.players[ctx.currentPlayer].tiles
          .filter(tile => tile.tileType == TileType.Monument)
          .forEach(tile => {
            moves.push({ move: "discard", args: [tile.subType] });
          });
      }
    }
    return moves;
  }
});
export default RaAI;
