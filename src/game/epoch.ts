import { GameState } from "./setup";
import { TileType, RiverType } from "./tile";
import Score from "./score";

export default function EndEpoch(G: GameState, ctx) {
  G.epoch += 1;
  G.raTrack = [];
  G.auctionTrack = [];

  FlipSuns(G);

  Score(G);

  DiscardTiles(G);

  // Player with highest numbered sun disk takes the first turn

  if (G.epoch > 3) {
    ctx.events.endGame();
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
