import { Tile } from "./tile";

export interface Player {
  points: number;
  suns: number[];
  usedSuns: number[];
  bid: number;
  pass: boolean;
  tiles: Tile[];
}

export default function SetupPlayer(playerID: number, suns: number[]): Player {
  return {
    points: 10,
    suns: suns,
    usedSuns: [],
    bid: null,
    pass: false;
    tiles: []
  };
}
