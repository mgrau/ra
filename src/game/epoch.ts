import { GameState } from "./setup";
import { TileType, RiverType } from "./tile";
import Score from "./score";
import { IGameCtx } from "boardgame.io/core";

export default function EndEpoch(G: GameState, ctx: IGameCtx) {
  G.raTrack = [];
  G.auctionTrack = [];

  FlipSuns(G);

  Score(G);

  DiscardTiles(G);

  // Player with highest numbered sun disk takes the first turn
  const maxSuns = G.players.map(player => Math.max(...player.suns));
  ctx.events.endTurn({ next: "" + maxSuns.indexOf(Math.max(...maxSuns)) });

  // end the game if
  if (G.epoch == 3) {
    const points = G.players.map(player => player.points);
    ctx.events.endGame({ winner: points.indexOf(Math.max(...points)) });
  } else {
    G.epoch += 1;
  }
}

function FlipSuns(G: GameState) {
  G.players.forEach(player => {
    player.suns = [...player.suns, ...player.usedSuns];
    player.usedSuns = [];
  });
}

function DiscardTiles(G: GameState) {
  G.players.forEach(player => {
    player.tiles = player.tiles.filter(
      tile =>
        tile.tileType == TileType.Monument ||
        tile.tileType == TileType.Pharaoh ||
        tile.subType == RiverType.nile
    );
  });
}
