import { Client } from "boardgame.io/client";
import { Ra } from "./game";
import Setup, { GameState } from "./setup";

test("auction end", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => Setup([[2], [3], [4]], [])
  };

  const client: any = Client({ numPlayers: 3, game: RaTest });

  var store: { G: GameState; ctx: any };
  store = client.store.getState();
  expect(store.ctx.phase).toBe("Action");
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.invoke();
  store = client.store.getState();
  expect(store.ctx.phase).toBe("Auction");
  expect(store.ctx.currentPlayer).toBe("1");

  client.moves.pass();
  store = client.store.getState();
  expect(store.ctx.phase).toBe("Auction");
  expect(store.ctx.currentPlayer).toBe("2");

  client.moves.pass();
  store = client.store.getState();
  expect(store.ctx.phase).toBe("Auction");
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.bid(2);
  store = client.store.getState();
  expect(store.ctx.phase).toBe("Action");
  expect(store.ctx.currentPlayer).toBe("1");
});
