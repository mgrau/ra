import { Client } from "boardgame.io/client";
import { Ra } from "./game";
import Setup, { GameState } from "./setup";
import { Tile, TileType } from "./tile";

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
