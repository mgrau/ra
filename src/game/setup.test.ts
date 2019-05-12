import { Client } from "boardgame.io/client";
import { Ra } from "./game";
import { GameState } from "./setup";

test("game setup", () => {
  var store: { G: GameState; ctx: any };

  var client: any = Client({ numPlayers: 2, game: Ra });
  store = client.store.getState();
  expect(store.ctx.numPlayers).toBe(2);

  var client: any = Client({ numPlayers: 3, game: Ra });
  store = client.store.getState();
  expect(store.ctx.numPlayers).toBe(3);

  var client: any = Client({ numPlayers: 4, game: Ra });
  store = client.store.getState();
  expect(store.ctx.numPlayers).toBe(4);

  var client: any = Client({ numPlayers: 5, game: Ra });
  store = client.store.getState();
  expect(store.ctx.numPlayers).toBe(5);
});
