import { GameState } from "./game";
import {
  Tile,
  TileType,
  RiverType,
  CivilizationType,
  MonumentType
} from "./tile";

export default function Score(G: GameState) {
  const pharaohs = G.players.map(player =>
    Count(player.tiles, TileType.Pharaoh)
  );

  const sunTotal = G.players.map(player =>
    player.suns.reduce((a, b) => a + b, 0)
  );

  G.players.forEach(player => {
    const tiles = player.tiles;

    if (Math.max(...pharaohs) != Math.min(...pharaohs)) {
      if (Count(tiles, TileType.Pharaoh) == Math.max(...pharaohs)) {
        player.points += 5;
      }
      if (Count(tiles, TileType.Pharaoh) == Math.min(...pharaohs)) {
        player.points -= 2;
      }
    }
    player.points += 3 * Count(tiles, TileType.Gold);

    player.points += 2 * Count(tiles, TileType.God);

    if (SubCount(tiles, RiverType.flood) > 0) {
      player.points += Count(tiles, TileType.River);
    }

    if (Count(tiles, TileType.Civilization) == 0) {
      player.points -= 5;
    }
    const numCivilizationTypes = [
      new Set(
        tiles
          .filter(tile => tile.tileType == TileType.Civilization)
          .map(tile => tile.subType)
      )
    ].length;

    if (numCivilizationTypes >= 3) {
      player.points += 5 * numCivilizationTypes;
    }

    if (Math.max(...sunTotal) != Math.min(...sunTotal)) {
      if (player.suns.reduce((a, b) => a + b, 0) == Math.max(...sunTotal)) {
        player.points += 5;
      }
      if (player.suns.reduce((a, b) => a + b, 0) == Math.min(...sunTotal)) {
        player.points -= 5;
      }
    }
  });
}

function Count(tiles: Tile[], type: TileType): number {
  return tiles.filter(tile => tile.tileType == type).length;
}

function SubCount(
  tiles: Tile[],
  type: RiverType | CivilizationType | MonumentType
): number {
  return tiles.filter(tile => tile.subType == type).length;
}
