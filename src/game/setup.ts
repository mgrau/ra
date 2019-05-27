import { Player, Players } from "./player";
import { Tile } from "./tile";

export interface GameState {
  epoch: number;
  sun: number;
  ra: string;
  players: Player[];
  raTrack: Tile[];
  auctionTrack: Tile[];
  tiles: Tile[];
  nextPlayer: number;
}

export default function Setup(suns: number[][], tiles: Tile[]): GameState {
  const G: GameState = {
    epoch: 1,
    sun: 1,
    ra: null,
    players: Players(suns),
    raTrack: [],
    auctionTrack: [],
    tiles: tiles,
    nextPlayer: null
  };
  return G;
}
