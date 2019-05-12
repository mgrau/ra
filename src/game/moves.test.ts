import { Client } from "boardgame.io/client";
import { Ra } from "./game";
import Setup, { GameState } from "./setup";
import { Tile, TileType } from "./tile";

test("draw", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => Setup([[2], [3]], [<Tile>{ tileType: TileType.Ra }, <Tile>{}])
  };

  const client: any = Client({ game: RaTest });

  client.moves.draw();
  var store: { G: GameState; ctx: any };
  store = client.store.getState();

  expect(store.G.auctionTrack.length).toBe(1);
  expect(store.G.tiles.length).toBe(1);

  client.moves.draw();
  store = client.store.getState();

  expect(store.G.raTrack.length).toBe(1);
  expect(store.G.auctionTrack.length).toBe(1);
  expect(store.G.tiles.length).toBe(0);
  expect(store.ctx.phase).toBe("Auction");
});
