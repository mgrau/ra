import { INVALID_MOVE } from "boardgame.io/core";
import { Tile, TileType } from "./tile";
import { GameState } from "./game";
import EndEpoch from "./epoch";

export function draw(G: GameState, ctx) {
  if (G.auctionTrack.length < 8) {
    const tile: Tile = G.tiles.pop();
    if (tile.tileType == TileType.Ra) {
      G.raTrack = [...G.raTrack, tile];
      if (G.raTrack.length < 8) {
        ctx.events.endPhase({ next: "Auction" });
      } else {
        EndEpoch(G);
      }
    } else {
      G.auctionTrack = [...G.auctionTrack, tile];
    }
  } else {
    console.log("can't draw a tile when auction track is full");
    return INVALID_MOVE;
  }
}

export function invoke(G: GameState, ctx) {
  G.ra = ctx.currentPlayer;
  ctx.events.endPhase({ next: "Auction" });
}

export function god(G: GameState, ctx) {}

export function canPass(G: GameState, ctx) {
  return !(
    ctx.currentPlayer == G.ra &&
    G.auctionTrack.length < 8 &&
    G.players.every(player => player.bid == null)
  );
}

export function pass(G: GameState, ctx) {
  // Ra player is required to bid only if
  // they invoked Ra when the auction track
  // was not full and all other players have
  // passed
  if (!canPass(G, ctx)) {
    console.log("can't pass if you are ra");
    return INVALID_MOVE;
  }
  G.players[ctx.currentPlayer].bid = null;
  G.players[ctx.currentPlayer].pass = true;
}

export function bid(G: GameState, ctx, bid: number) {
  if (G.players[ctx.currentPlayer].suns.includes(bid)) {
    G.players[ctx.currentPlayer].bid = bid;
  } else {
    console.log("invalid bid");
    return INVALID_MOVE;
  }
}
