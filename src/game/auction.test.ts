import { Client } from "boardgame.io/client";
import { Ra } from "./game";
import Setup, { GameState } from "./setup";
import {
  Tile,
  TileType,
  DisasterType,
  RiverType,
  CivilizationType,
  MonumentType
} from "./tile";
import { Players } from "./player";

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

test("drought discard", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2, 6], [3, 4], [5, 10]]);
      const G: GameState = {
        epoch: 3,
        sun: 1,
        ra: null,
        players: players,
        raTrack: [],
        auctionTrack: [
          <Tile>{ tileType: TileType.River, subType: RiverType.nile },
          <Tile>{ tileType: TileType.River, subType: RiverType.nile },
          <Tile>{ tileType: TileType.Disaster, subType: DisasterType.drought },
          <Tile>{ tileType: TileType.River, subType: RiverType.flood },
          <Tile>{ tileType: TileType.Gold }
        ],
        tiles: []
      };
      return G;
    }
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
  expect(store.G.players[0].tiles.length).toBe(2);
  expect(store.G.players[0].tiles).toStrictEqual([
    <Tile>{ tileType: TileType.River, subType: RiverType.nile },
    <Tile>{ tileType: TileType.Gold }
  ]);
});

test("funeral discard", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2, 11], [5, 10], [3, 4], [7, 8]]);
      const G: GameState = {
        epoch: 1,
        sun: 1,
        ra: null,
        players: players,
        raTrack: [],
        auctionTrack: [
          <Tile>{ tileType: TileType.Disaster, subType: DisasterType.funeral },
          <Tile>{ tileType: TileType.Pharaoh },
          <Tile>{ tileType: TileType.Gold }
        ],
        tiles: []
      };
      return G;
    }
  };

  const client: any = Client({ numPlayers: 4, game: RaTest });

  var store: { G: GameState; ctx: any };

  client.moves.invoke();
  client.moves.pass();
  client.moves.pass();
  client.moves.bid(8);
  client.moves.bid(11);
  store = client.store.getState();
  expect(store.ctx.phase).toBe("Action");
  expect(store.ctx.currentPlayer).toBe("1");
  expect(store.G.players[0].tiles.length).toBe(1);
  expect(store.G.players[0].tiles).toStrictEqual([
    <Tile>{ tileType: TileType.Gold }
  ]);
});

test("war discard", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2, 11], [5, 10]]);
      const G: GameState = {
        epoch: 1,
        sun: 1,
        ra: null,
        players: players,
        raTrack: [],
        auctionTrack: [
          <Tile>{
            tileType: TileType.Civilization,
            subType: CivilizationType.agriculture
          },
          <Tile>{
            tileType: TileType.Civilization,
            subType: CivilizationType.writing
          },
          <Tile>{ tileType: TileType.Disaster, subType: DisasterType.war },
          <Tile>{
            tileType: TileType.Civilization,
            subType: CivilizationType.art
          }
        ],
        tiles: []
      };
      return G;
    }
  };

  const client: any = Client({ numPlayers: 2, game: RaTest });

  var store: { G: GameState; ctx: any };

  client.moves.invoke();
  client.moves.bid(5);
  client.moves.bid(2);
  store = client.store.getState();
  expect(store.ctx.phase).toBe("Action");
  expect(store.ctx.currentPlayer).toBe("1");
  expect(store.G.players[1].tiles.length).toBe(1);
  expect(store.G.players[1].tiles).toStrictEqual([
    <Tile>{
      tileType: TileType.Civilization,
      subType: CivilizationType.art
    }
  ]);
});

test("earthquake discard", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2, 11], [5, 10], [3, 4]]);
      const G: GameState = {
        epoch: 1,
        sun: 1,
        ra: null,
        players: players,
        raTrack: [],
        auctionTrack: [
          <Tile>{
            tileType: TileType.Disaster,
            subType: DisasterType.earthquake
          },
          <Tile>{
            tileType: TileType.Monument,
            subType: MonumentType.pyramid
          }
        ],
        tiles: []
      };
      return G;
    }
  };

  const client: any = Client({ numPlayers: 3, game: RaTest });

  var store: { G: GameState; ctx: any };

  client.moves.invoke();
  client.moves.pass();
  client.moves.pass();
  client.moves.bid(2);
  store = client.store.getState();
  expect(store.ctx.phase).toBe("Action");
  expect(store.ctx.currentPlayer).toBe("1");
  expect(store.G.players[0].tiles.length).toBe(0);
  expect(store.G.players[0].tiles).toStrictEqual([]);
});
