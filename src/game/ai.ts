import { AI } from "boardgame.io/ai";
import { GameState } from "./setup";
import { IGameCtx } from "boardgame.io/core";
import { canPass } from "./moves";
import { TileType } from "./tile";

import { RandomBot, MCTSBot } from "boardgame.io/ai";
import Score, { tabulateScore } from "./score";

class myBot extends MCTSBot {
  constructor({ enumerate, seed, objectives, game, iterations, playoutDepth }) {
    super({ enumerate, seed, objectives, game, iterations, playoutDepth });

    this.iterations = 10;
    this.playoutDepth = 5;
  }
}

const RaAI = AI({
  bot: myBot,
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

export function raProbability(G: GameState): number {
  return (
    G.tiles.filter(tile => tile.tileType == TileType.Ra).length / G.tiles.length
  );
}

export function currentScore(G: GameState, playerID: number): number {
  return Math.max(
    0,
    G.players[playerID].points + tabulateScore(G.players, 3)[playerID].total
  );
}

export function auctionScore(G: GameState, playerID: number): number {
  let proposedG = { ...G };
  proposedG.players = G.players.map(player => {
    return { ...player };
  });
  proposedG.players[playerID].tiles = [
    ...proposedG.players[playerID].tiles,
    ...proposedG.auctionTrack
  ];
  return currentScore(proposedG, playerID) - currentScore(G, playerID);
}
