import { GameState } from "./setup";
import {
  Tile,
  TileType,
  RiverType,
  CivilizationType,
  MonumentType
} from "./tile";
import { Player } from "./player";
export interface Score {
  pharaohs: number;
  gold: number;
  gods: number;
  river: number;
  civilization: number;
  suns: number;
  monument: number;
  total: number;
}

export default function Score(G: GameState) {
  const score = tabulateScore(G.players, G.epoch);

  G.players.forEach((player, index) => {
    player.points = Math.max(0, player.points + score[index].total);
    player.score[G.epoch - 1] = score[index];
  });
}

export function tabulateScore(players: Player[], epoch: number): Score[] {
  const pharaohs = players.map(player => Count(player.tiles, TileType.Pharaoh));

  const sunTotal = players.map(player =>
    player.suns.reduce((a, b) => a + b, 0)
  );

  return players.map(player => {
    const score = <Score>{
      pharaohs: 0,
      gold: 0,
      gods: 0,
      river: 0,
      civilization: 0,
      suns: 0,
      monument: 0,
      total: 0
    };
    const tiles = player.tiles;

    if (Math.max(...pharaohs) != Math.min(...pharaohs)) {
      if (Count(tiles, TileType.Pharaoh) == Math.max(...pharaohs)) {
        score.pharaohs = 5;
      }
      if (Count(tiles, TileType.Pharaoh) == Math.min(...pharaohs)) {
        score.pharaohs = -2;
      }
    }

    score.gold = 3 * Count(tiles, TileType.Gold);

    score.gods = 2 * Count(tiles, TileType.God);

    if (SubCount(tiles, RiverType.flood) > 0) {
      score.river = Count(tiles, TileType.River);
    }

    if (Count(tiles, TileType.Civilization) == 0) {
      score.civilization = -5;
    }
    const numCivilizationTypes = tiles
      .filter(tile => tile.tileType == TileType.Civilization)
      .map(tile => tile.subType)
      .filter((value, index, self) => self.indexOf(value) == index).length;

    if (numCivilizationTypes >= 3) {
      score.civilization = 5 * (numCivilizationTypes - 2);
    }

    if (epoch == 3) {
      if (Math.max(...sunTotal) != Math.min(...sunTotal)) {
        if (player.suns.reduce((a, b) => a + b, 0) == Math.max(...sunTotal)) {
          score.suns = 5;
        }
        if (player.suns.reduce((a, b) => a + b, 0) == Math.min(...sunTotal)) {
          score.suns = -5;
        }
      }

      Object.keys(MonumentType).forEach(monumentType => {
        switch (SubCount(tiles, <MonumentType>monumentType)) {
          case 5:
            score.monument += 15;
            break;
          case 4:
            score.monument += 10;
            break;
          case 3:
            score.monument += 5;
            break;
          default:
        }
      });
      const numMonumentTypes = tiles
        .filter(tile => tile.tileType == TileType.Monument)
        .map(tile => tile.subType)
        .filter((value, index, self) => self.indexOf(value) == index).length;

      if (numMonumentTypes <= 6) {
        score.monument += numMonumentTypes;
      }
      if (numMonumentTypes == 7) {
        score.monument += 10;
      }
      if (numMonumentTypes == 8) {
        score.monument += 15;
      }
    }

    score.total = Object.keys(score)
      .map(key => score[key])
      .reduce((a, b) => a + b);
    return score;
  });
}

export function Count(tiles: Tile[], type: TileType): number {
  return tiles.filter(tile => tile.tileType == type).length;
}

function SubCount(
  tiles: Tile[],
  type: RiverType | CivilizationType | MonumentType
): number {
  return tiles.filter(tile => tile.subType == type).length;
}

// pharaoh tiles
// most pharaoh tiles is worth 5 points, least is -2 points
// if all players tie, no point change

// gold tiles
// 3 points

// god tiles
// 2 points

// river tiles
// 1 point per river tile (nile and flood) is have at least one flood tile

// civilization tiles
// 0 tiles is -5 points
// 3 different is 5
// 4 different is 10
// 5 different is 15

// monument tiles
// each group of 3 is worth 5
// each group of 4 is worth 10
// each group of 5 is worth 15
// 1,2,3,4,5,6,10,15 points for 1,2,3,4,5,6,7,8 different monuments

// highest total sun disks is 5 points
// lowest total is -5 points
