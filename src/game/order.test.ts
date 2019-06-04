import { Client } from "boardgame.io/client";
import { Ra } from "./game";
import Setup, { GameState } from "./setup";
import { Tile, TileType } from "./tile";
import { Players } from "./player";

test("order 2 player", () => {
  const RaTest = {
    ...Ra,
    setup: ctx =>
      Setup(
        [[2], [3]],
        [
          <Tile>{},
          <Tile>{},
          <Tile>{},
          <Tile>{ tileType: TileType.Ra },
          <Tile>{},
          <Tile>{},
          <Tile>{}
        ]
      )
  };

  const client: any = Client({ numPlayers: 2, game: RaTest });

  var store: { G: GameState; ctx: any };

  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");
  expect(store.ctx.phase).toBe("Action");

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");
  expect(store.ctx.phase).toBe("Auction");

  client.moves.pass();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");
  expect(store.ctx.phase).toBe("Auction");

  client.moves.bid(3);
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");
  expect(store.ctx.phase).toBe("Action");

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");
  expect(store.ctx.phase).toBe("Action");
});

test("order 3 player", () => {
  const RaTest = {
    ...Ra,
    setup: ctx =>
      Setup(
        [[2], [3], [4]],
        [
          <Tile>{},
          <Tile>{},
          <Tile>{},
          <Tile>{ tileType: TileType.Ra },
          <Tile>{},
          <Tile>{},
          <Tile>{}
        ]
      )
  };

  const client: any = Client({ numPlayers: 3, game: RaTest });

  var store: { G: GameState; ctx: any };

  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("2");

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");
  expect(store.ctx.phase).toBe("Action");

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");
  expect(store.ctx.phase).toBe("Auction");

  client.moves.pass();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("2");
  expect(store.ctx.phase).toBe("Auction");

  client.moves.pass();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");
  expect(store.ctx.phase).toBe("Auction");

  client.moves.bid(2);
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");
  expect(store.ctx.phase).toBe("Action");

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("2");
  expect(store.ctx.phase).toBe("Action");

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");
  expect(store.ctx.phase).toBe("Action");
});

test("order end of epoch", () => {
  var RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2, 6], [3, 4], [5, 10]]);
      const G: GameState = {
        epoch: 1,
        sun: 1,
        ra: null,
        players: players,
        discard: null,
        nextPlayer: null,
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

  var client: any = Client({ numPlayers: 3, game: RaTest });

  var store: { G: GameState; ctx: any };

  store = client.store.getState();
  expect(store.G.epoch).toBe(1);
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.draw();
  store = client.store.getState();
  expect(store.G.epoch).toBe(2);
  expect(store.ctx.currentPlayer).toBe("2");

  var RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2], [3], [4], [10]]);
      const G: GameState = {
        epoch: 1,
        sun: 1,
        ra: null,
        discard: null,
        nextPlayer: null,
        players: players,
        raTrack: [
          <Tile>{ tileType: TileType.Ra },
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

  var client: any = Client({ numPlayers: 4, game: RaTest });

  var store: { G: GameState; ctx: any };

  store = client.store.getState();
  expect(store.G.epoch).toBe(1);
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.draw();
  store = client.store.getState();
  expect(store.G.epoch).toBe(2);
  expect(store.ctx.currentPlayer).toBe("3");

  var RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[10], [3], [4], [5], [2]]);
      const G: GameState = {
        epoch: 1,
        sun: 1,
        ra: null,
        discard: null,
        nextPlayer: null,
        players: players,
        raTrack: [
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
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

  var client: any = Client({ numPlayers: 5, game: RaTest });

  var store: { G: GameState; ctx: any };

  store = client.store.getState();
  expect(store.G.epoch).toBe(1);
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.draw();
  store = client.store.getState();
  expect(store.G.epoch).toBe(2);
  expect(store.ctx.currentPlayer).toBe("0");
});

test("order end of epoch suns", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2], [3], [4]]);
      const G: GameState = {
        epoch: 1,
        sun: 1,
        ra: null,
        discard: null,
        nextPlayer: null,
        players: players,
        raTrack: [],
        auctionTrack: [],
        tiles: []
      };
      return G;
    }
  };

  const client: any = Client({ numPlayers: 3, game: RaTest });

  var store: { G: GameState; ctx: any };

  store = client.store.getState();
  expect(store.G.epoch).toBe(1);
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.invoke();
  client.moves.pass();
  client.moves.pass();
  client.moves.bid(2);

  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");
  client.moves.invoke();
  client.moves.bid(4);
  client.moves.pass();

  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");
  client.moves.invoke();
  client.moves.bid(3);

  store = client.store.getState();
  expect(store.G.epoch).toBe(2);
  expect(store.ctx.currentPlayer).toBe("1");
});
