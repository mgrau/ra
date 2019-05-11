import { Tile } from "./tile";

export interface Player {
  points: number;
  suns: number[];
  usedSuns: number[];
  bid: number;
  tiles: Tile[];
}

export default function SetupPlayer(playerID: number, suns: number[]): Player {
  return {
    points: 10,
    suns: suns,
    usedSuns: [],
    bid: null,
    tiles: []
  };
}
