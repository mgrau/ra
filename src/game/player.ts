import { Tile } from "./tile";
import { Score } from "./score";
export interface Player {
  points: number;
  score: Score[];
  suns: number[];
  usedSuns: number[];
  bid: number;
  pass: boolean;
  tiles: Tile[];
}

export function Players(playerSuns: number[][]): Player[] {
  return playerSuns.map((suns, index) => SetupPlayer(index, suns));
}

export default function SetupPlayer(playerID: number, suns: number[]): Player {
  return {
    points: 10,
    score: [zeroScore(), zeroScore(), zeroScore()],
    suns: suns,
    usedSuns: [],
    bid: null,
    pass: false,
    tiles: []
  };
}

function zeroScore(): Score {
  return {
    pharaohs: 0,
    gold: 0,
    gods: 0,
    river: 0,
    civilization: 0,
    suns: 0,
    monument: 0,
    total: 0
  };
}