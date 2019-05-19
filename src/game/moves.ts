import { INVALID_MOVE, IGameCtx } from "boardgame.io/core";
import { Tile, TileType } from "./tile";
import { GameState } from "./setup";
import EndEpoch from "./epoch";

export function draw(G: GameState, ctx: IGameCtx) {
  if (G.auctionTrack.length < 8) {
    const tile: Tile = G.tiles.pop();
    if (tile.tileType == TileType.Ra) {
      G.raTrack = [...G.raTrack, tile];
      if (G.raTrack.length < raTrackLength(ctx.numPlayers)) {
        ctx.events.endPhase({ next: "Auction" });
      } else {
        EndEpoch(G, ctx);
      }
    } else {
      G.auctionTrack = [...G.auctionTrack, tile];
    }
  } else {
    console.log("can't draw a tile when auction track is full");
    return INVALID_MOVE;
  }
}

export function invoke(G: GameState, ctx: IGameCtx) {
  G.ra = ctx.currentPlayer;
  ctx.events.endPhase({ next: "Auction" });
}

export function god(G: GameState, ctx: IGameCtx, tileIndex: number[]) {
  let playerTiles = G.players[ctx.currentPlayer].tiles;
  if (tileIndex.length == 0) {
    console.log("must specify at least one tile to take");
    return INVALID_MOVE;
  }

  if (
    !tileIndex.every(index => Object.keys(G.auctionTrack).includes(index + ""))
  ) {
    console.log("must select a valid tile on the auction track");
    return INVALID_MOVE;
  }

  if (
    playerTiles.filter(tile => tile.tileType == TileType.God).length <
    tileIndex.length
  ) {
    console.log("don't have enough god tiles");
    return INVALID_MOVE;
  }

  // selected tiles from auction track
  const tiles = G.auctionTrack.filter((tile, index) =>
    tileIndex.includes(index)
  );

  // discard god tiles
  tileIndex.forEach(tile => (playerTiles = discardGod(playerTiles)));

  // remove tiles from auction track
  G.auctionTrack = G.auctionTrack.filter(
    (tile, index) => !tileIndex.includes(index)
  );

  // add tiles to player's tiles
  G.players[ctx.currentPlayer].tiles = [...playerTiles, ...tiles];
}

export function pass(G: GameState, ctx: IGameCtx) {
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

export function bid(G: GameState, ctx: IGameCtx, bid: number) {
  if (G.players[ctx.currentPlayer].suns.includes(bid)) {
    G.players[ctx.currentPlayer].bid = bid;
  } else {
    console.log("invalid bid");
    return INVALID_MOVE;
  }
}

export function raTrackLength(numPlayers: number): number {
  switch (numPlayers) {
    case 2:
      return 6;
    case 3:
      return 8;
    case 4:
      return 9;
    case 5:
      return 10;
  }
}

export function canPass(G: GameState, ctx: IGameCtx) {
  return !(
    ctx.currentPlayer == G.ra &&
    G.auctionTrack.length < 8 &&
    G.players.every(player => player.bid == null)
  );
}

export function discardGod(tiles: Tile[]) {
  const index = tiles.findIndex(tile => tile.tileType == TileType.God);
  if (index >= 0) {
    tiles.splice(index, 1);
  }
  return tiles;
}
