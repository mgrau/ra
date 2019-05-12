import { Game } from "boardgame.io/core";
import { draw, invoke, god, pass, bid } from "./moves";
import Tiles, { Tile } from "./tile";
import StartingSuns from "./suns";
import SetupPlayer, { Player } from "./player";
import AuctionEnd from "./auction";
import TurnOrder from "./order";
export interface GameState {
  epoch: number;
  sun: number;
  ra: number;
  players: Player[];
  raTrack: Tile[];
  auctionTrack: Tile[];
  tiles: Tile[];
}

export const Ra = Game({
  setup: ctx => {
    const suns: number[][] = ctx.random.Shuffle(StartingSuns(ctx.numPlayers));
    const players: Player[] = [];
    for (var i: number = 0; i < ctx.numPlayers; i++) {
      players[i] = SetupPlayer(i, suns[i]);
    }
    const G: GameState = {
      epoch: 1,
      sun: 1,
      ra: null,
      players: players,
      raTrack: [],
      auctionTrack: [],
      tiles: ctx.random.Shuffle(Tiles())
    };
    return G;
  },

  moves: {
    draw,
    invoke,
    god,
    pass,
    bid
  },
  flow: {
    startingPhase: "Action",
    endTurn: false,
    endPhase: false,
    phases: {
      Action: {
        movesPerTurn: 1,
        allowedMoves: ["draw", "invoke", "god"]
      },
      Auction: {
        movesPerTurn: 1,
        allowedMoves: ["pass", "bid"],
        endPhaseIf: (G: GameState, ctx) =>
          G.players.every(
            player =>
              player.bid != null || player.pass || player.suns.length == 0
          ),
        onPhaseEnd: (G: GameState) => AuctionEnd(G)
      }
    },
    turnOrder: TurnOrder

    // endGameIf: (G: GameState) => G.epoch > 3
  }
});

export interface Ctx {
  numPlayers: number;
  turn: number;
  currentPlayer: string;
  actionPlayers: string[];
  currentPlayerMoves: number;
  playOrder: string[];
  playOrderPos: number;
  stats: any;
  allPlayed: boolean;
  phase: string;
  prePhase: string;
  allowedMoves: string[];
}
