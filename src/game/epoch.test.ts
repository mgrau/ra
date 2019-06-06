import { Client } from "boardgame.io/client";
import { Ra } from "./game";
import { GameState } from "./setup";
import { Tile, TileType } from "./tile";
import { Players } from "./player";

test("game end", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2, 6], [3, 4], [5, 10]]);
      const G: GameState = {
        epoch: 3,
        sun: 1,
        ra: null,
        nextPlayer: null,
        discard: { civilization: 0, monument: 0 },
        players: players,
        raTrack: [
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra }
        ],
        auctionTrack: [],
        tiles: [<Tile>{ tileType: TileType.Ra }]
      };
      return G;
    }
  };

  const client: any = Client({ numPlayers: 3, game: RaTest });

  var store: { G: GameState; ctx: any };

  store = client.store.getState();
  expect(store.G.epoch).toBe(3);
  expect(store.ctx.currentPlayer).toBe("0");
  expect(store.ctx.gameover).not.toBeDefined();

  client.moves.draw();
  store = client.store.getState();
  expect(store.G.epoch).toBe(3);
  expect(store.ctx.gameover).toBeDefined();
  expect(store.ctx.gameover.winner).toBe(2);
});
