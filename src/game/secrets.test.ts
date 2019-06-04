import { Client } from "boardgame.io/client";
import { Ra } from "./game";
import { GameState } from "./setup";
import StripSecrets from "./secrets";

test("secrets", () => {
  const client: any = Client({ numPlayers: 3, game: Ra, playerID: "0" });

  var store: { G: GameState; ctx: any };
  store = client.store.getState();

  var secretG;
  secretG = StripSecrets(store.G, "0");
  expect(secretG.tiles).toBeUndefined();

  secretG = StripSecrets(secretG, "0");
  expect(secretG.tiles).toBeUndefined();
});
