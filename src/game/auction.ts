import { GameState } from "./setup";
import EndEpoch from "./epoch";
import { Tile, TileType, DisasterType, RiverType } from "./tile";
import { IGameCtx } from "boardgame.io/core";
import TurnOrder from "./order";

export default function AuctionEnd(G: GameState, ctx: IGameCtx) {
  G.ra = null;
  const maxBid = Math.max(...G.players.map(player => player.bid));
  const winner = G.players.find(player => player.bid == maxBid);
  const winnerID = G.players.findIndex(player => player.bid == maxBid);
  if (winner == undefined) {
    if (G.auctionTrack.length >= 8) {
      G.auctionTrack = [];
    }
  } else {
    winner.usedSuns = [...winner.usedSuns, G.sun];
    winner.tiles = [...winner.tiles, ...G.auctionTrack];
    const disasters = winner.tiles.filter(
      tile => tile.tileType == TileType.Disaster
    );
    winner.tiles = winner.tiles.filter(
      tile => tile.tileType != TileType.Disaster
    );
    disasters.forEach(disaster => {
      if (disaster.subType == DisasterType.funeral) {
        winner.tiles = DiscardPharaoh(winner.tiles);
        winner.tiles = DiscardPharaoh(winner.tiles);
      }
      if (disaster.subType == DisasterType.drought) {
        winner.tiles = DiscardRiver(winner.tiles);
        winner.tiles = DiscardRiver(winner.tiles);
      }
      if (disaster.subType == DisasterType.war) {
        G.discard.civilization += 2;
      }
      if (disaster.subType == DisasterType.earthquake) {
        G.discard.monument += 2;
      }
    });

    if (
      G.discard.civilization >=
      winner.tiles.filter(tile => tile.tileType == TileType.Civilization).length
    ) {
      G.discard.civilization = 0;
      winner.tiles = winner.tiles.filter(
        tile => tile.tileType != TileType.Civilization
      );
    }
    if (
      G.discard.monument >=
      winner.tiles.filter(tile => tile.tileType == TileType.Monument).length
    ) {
      G.discard.monument = 0;
      winner.tiles = winner.tiles.filter(
        tile => tile.tileType != TileType.Monument
      );
    }

    if (G.discard.civilization > 0 || G.discard.monument > 0) {
      ctx.events.endPhase({ next: "Discard" });
      ctx.events.endTurn({ next: winnerID + "" });
      G.nextPlayer = TurnOrder.next(G, ctx);
    } else {
      winner.suns.splice(winner.suns.indexOf(maxBid), 1);
    }
    G.sun = maxBid;
    G.auctionTrack = [];
  }

  G.players.forEach(player => {
    player.bid = null;
    player.pass = false;
  });

  if (
    G.players.every(player => player.suns.length == 0) &&
    (G.discard.civilization == 0 && G.discard.monument == 0)
  ) {
    EndEpoch(G, ctx);
  }
  return G;
}

function DiscardPharaoh(tiles: Tile[]) {
  const index = tiles.findIndex(tile => tile.tileType == TileType.Pharaoh);
  if (index >= 0) {
    tiles.splice(index, 1);
  }
  return tiles;
}

function DiscardRiver(tiles: Tile[]) {
  const floodIndex = tiles.findIndex(tile => tile.subType == RiverType.flood);
  if (floodIndex >= 0) {
    tiles.splice(floodIndex, 1);
  } else {
    const nileIndex = tiles.findIndex(tile => tile.subType == RiverType.nile);
    if (nileIndex >= 0) {
      tiles.splice(nileIndex, 1);
    }
  }
  return tiles;
}
