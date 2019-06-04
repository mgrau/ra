import { Client } from "boardgame.io/client";
import { Ra } from "./game";
import Setup, { GameState } from "./setup";
import { Tile, TileType } from "./tile";
import { discardGod } from "./moves";

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

test("draw multiplayer", () => {
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

test("draw tiles multiplayer", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => Setup([[2], [3]], [<Tile>{ tileType: TileType.Ra }, <Tile>{}])
  };
  const spec = {
    game: Ra,
    multiplayer: { local: true }
  };

  const player0: any = Client({ ...spec, playerID: "0" });
  const player1: any = Client({ ...spec, playerID: "1" });

  player0.connect();
  player1.connect();

  var store: { G: GameState; ctx: any };
  store = player0.store.getState();
  expect(store.G.tiles).toBeUndefined();
  expect(store.G.auctionTrack.length).toBe(0);

  store = player1.store.getState();
  expect(store.G.tiles).toBeUndefined();
  expect(store.G.auctionTrack.length).toBe(0);

  player0.moves.draw();
  store = player0.store.getState();
  expect(store.G.auctionTrack.length).toBe(1);
  expect(store.G.tiles).toBeUndefined();

  store = player1.store.getState();
  expect(store.G.auctionTrack.length).toBe(1);
  expect(store.G.tiles).toBeUndefined();
});

test("full auction track", () => {
  const RaTest = {
    ...Ra,
    setup: ctx =>
      Setup(
        [[2], [3]],
        [
          <Tile>{},
          <Tile>{},
          <Tile>{},
          <Tile>{},
          <Tile>{},
          <Tile>{},
          <Tile>{},
          <Tile>{},
          <Tile>{}
        ]
      )
  };

  const client: any = Client({ game: RaTest });
  var store: { G: GameState; ctx: any };

  client.moves.draw();
  client.moves.draw();
  client.moves.draw();
  client.moves.draw();
  client.moves.draw();
  client.moves.draw();
  client.moves.draw();
  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");
  expect(store.G.auctionTrack.length).toBe(8);

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");
  expect(store.G.auctionTrack.length).toBe(8);
});

test("invoke", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => Setup([[2], [3], [4]], [<Tile>{}])
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

  client.moves.pass();
  store = client.store.getState();
  expect(store.ctx.phase).toBe("Auction");
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.bid(3);
  store = client.store.getState();
  expect(store.ctx.phase).toBe("Auction");
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.bid(2);
  store = client.store.getState();
  expect(store.ctx.phase).toBe("Action");
  expect(store.ctx.currentPlayer).toBe("1");
});

test("god", () => {
  const RaTest = {
    ...Ra,
    setup: ctx =>
      Setup(
        [[2, 5], [3, 6]],
        [
          <Tile>{},
          <Tile>{ tileType: TileType.Gold },
          <Tile>{ tileType: TileType.God }
        ]
      )
  };

  const client: any = Client({ game: RaTest });
  var store: { G: GameState; ctx: any };

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");
  expect(store.G.auctionTrack.length).toBe(1);
  expect(store.G.auctionTrack[0].tileType).toBe(TileType.God);

  client.moves.invoke();
  client.moves.bid(2);
  client.moves.bid(3);
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");
  expect(store.G.auctionTrack.length).toBe(0);
  expect(store.G.players[0].tiles.length).toBe(0);
  expect(store.G.players[1].tiles.length).toBe(1);
  expect(store.G.players[1].tiles[0].tileType).toBe(TileType.God);

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");
  expect(store.G.auctionTrack.length).toBe(1);
  expect(store.G.auctionTrack[0].tileType).toBe(TileType.Gold);

  client.moves.god([]);
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");

  client.moves.god([4]);
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");

  client.moves.god([0]);
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");
  expect(store.G.auctionTrack.length).toBe(0);
  expect(store.G.players[1].tiles.length).toBe(1);
  expect(store.G.players[1].tiles[0].tileType).toBe(TileType.Gold);

  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");

  client.moves.god([0]);
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");
});

test("discard god", () => {
  let tiles = discardGod(<Tile[]>[]);
  expect(tiles).toStrictEqual([]);

  tiles = discardGod([<Tile>{ tileType: TileType.Gold }]);
  expect(tiles).toStrictEqual([<Tile>{ tileType: TileType.Gold }]);

  tiles = discardGod([
    <Tile>{ tileType: TileType.Gold },
    <Tile>{ tileType: TileType.God },
    <Tile>{ tileType: TileType.Gold }
  ]);
  expect(tiles).toStrictEqual([
    <Tile>{ tileType: TileType.Gold },
    <Tile>{ tileType: TileType.Gold }
  ]);
});
