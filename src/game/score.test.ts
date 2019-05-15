import { Client } from "boardgame.io/client";
import { Ra } from "./game";
import Setup, { GameState } from "./setup";
import {
  Tile,
  TileType,
  RiverType,
  CivilizationType,
  MonumentType
} from "./tile";
import { Players } from "./player";

test("score epoch 1", () => {
  const RaTest = {
    ...Ra,
    setup: ctx =>
      Setup(
        [[2], [3]],
        [
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Ra },
          <Tile>{ tileType: TileType.Gold }
        ]
      )
  };

  const client: any = Client({ numPlayers: 2, game: RaTest });

  var store: { G: GameState; ctx: any };

  client.moves.draw();
  client.moves.draw();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.bid(2);
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");

  client.moves.pass();
  store = client.store.getState();
  expect(store.ctx.currentPlayer).toBe("1");
  expect(store.ctx.phase).toBe("Action");

  client.moves.draw();
  client.moves.pass();
  client.moves.draw();
  client.moves.pass();
  client.moves.draw();
  client.moves.pass();
  client.moves.draw();
  client.moves.pass();
  client.moves.draw();
  client.moves.pass();
  client.moves.draw();
  client.moves.pass();
  client.moves.draw();

  store = client.store.getState();

  expect(store.G.players[0].score[0].gold).toBe(3);
  expect(store.G.players[0].score[0].civilization).toBe(-5);
  expect(store.G.players[0].score[0].total).toBe(-2);
  expect(store.G.players[0].points).toBe(8);
});

test("score pharoah", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2], [2]]);
      players[0].tiles = [
        <Tile>{ tileType: TileType.Civilization },
        <Tile>{ tileType: TileType.Pharaoh }
      ];
      const G: GameState = {
        epoch: 1,
        sun: 1,
        ra: null,
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

  const client: any = Client({ numPlayers: 2, game: RaTest });

  var store: { G: GameState; ctx: any };

  client.moves.draw();
  store = client.store.getState();

  expect(store.G.players[0].score[0].civilization).toBe(0);
  expect(store.G.players[0].score[0].pharaohs).toBe(5);
  expect(store.G.players[0].score[0].total).toBe(5);
  expect(store.G.players[0].points).toBe(15);

  expect(store.G.players[1].score[0].civilization).toBe(-5);
  expect(store.G.players[1].score[0].pharaohs).toBe(-2);
  expect(store.G.players[1].score[0].total).toBe(-7);
  expect(store.G.players[1].points).toBe(3);
});

test("score flood", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2], [2]]);
      players[0].tiles = [
        <Tile>{ tileType: TileType.Civilization },
        <Tile>{ tileType: TileType.River, subType: RiverType.nile },
        <Tile>{ tileType: TileType.River, subType: RiverType.nile },
        <Tile>{ tileType: TileType.River, subType: RiverType.nile },
        <Tile>{ tileType: TileType.River, subType: RiverType.flood }
      ];
      players[1].tiles = [
        <Tile>{ tileType: TileType.Civilization },
        <Tile>{ tileType: TileType.River, subType: RiverType.nile },
        <Tile>{ tileType: TileType.River, subType: RiverType.nile }
      ];
      const G: GameState = {
        epoch: 1,
        sun: 1,
        ra: null,
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

  const client: any = Client({ numPlayers: 2, game: RaTest });

  var store: { G: GameState; ctx: any };

  client.moves.draw();
  store = client.store.getState();

  expect(store.G.players[0].score[0].river).toBe(4);
  expect(store.G.players[0].points).toBe(14);
  expect(store.G.players[1].score[0].river).toBe(0);
  expect(store.G.players[1].points).toBe(10);
});

test("score civilization", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2], [2], [2]]);
      players[0].tiles = [
        <Tile>{
          tileType: TileType.Civilization,
          subType: CivilizationType.agriculture
        },
        <Tile>{
          tileType: TileType.Civilization,
          subType: CivilizationType.art
        },
        <Tile>{
          tileType: TileType.Civilization,
          subType: CivilizationType.astronomy
        },
        <Tile>{
          tileType: TileType.Civilization,
          subType: CivilizationType.writing
        }
      ];
      players[1].tiles = [
        <Tile>{
          tileType: TileType.Civilization,
          subType: CivilizationType.agriculture
        },
        <Tile>{ tileType: TileType.Civilization, subType: CivilizationType.art }
      ];
      const G: GameState = {
        epoch: 1,
        sun: 1,
        ra: null,
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

  client.moves.draw();
  store = client.store.getState();

  expect(store.G.players[0].score[0].civilization).toBe(10);
  expect(store.G.players[0].points).toBe(20);
  expect(store.G.players[1].score[0].civilization).toBe(0);
  expect(store.G.players[1].points).toBe(10);
  expect(store.G.players[2].score[0].civilization).toBe(-5);
  expect(store.G.players[2].points).toBe(10 - 5);
});

test("score monument", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2], [3], [4], [5]]);
      players[0].tiles = [
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.fortress },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.fortress },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.fortress },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.obelisk },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.pyramid }
      ];
      players[1].tiles = [
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.obelisk },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.obelisk },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.obelisk },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.obelisk },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.obelisk }
      ];
      players[2].tiles = [
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.fortress },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.obelisk },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.palace },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.pyramid },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.sphinx },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.statue },
        <Tile>{
          tileType: TileType.Monument,
          subType: MonumentType.step_pyramid
        },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.temple }
      ];
      players[3].tiles = [
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.fortress },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.obelisk },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.palace },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.pyramid },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.sphinx },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.statue },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.temple },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.temple },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.temple },
        <Tile>{ tileType: TileType.Monument, subType: MonumentType.temple }
      ];
      const G: GameState = {
        epoch: 2,
        sun: 1,
        ra: null,
        players: players,
        raTrack: [],
        auctionTrack: [],
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
  client.moves.pass();
  client.moves.bid(2);
  client.moves.invoke();
  client.moves.pass();
  client.moves.pass();
  client.moves.bid(3);
  client.moves.invoke();
  client.moves.pass();
  client.moves.bid(4);
  client.moves.invoke();
  client.moves.bid(5);
  store = client.store.getState();
  expect(store.G.epoch).toBe(3);
  expect(store.G.players[0].score[1].monument).toBe(0);
  expect(store.G.players[1].score[1].monument).toBe(0);
  expect(store.G.players[2].score[1].monument).toBe(0);
  expect(store.G.players[3].score[1].monument).toBe(0);
  expect(store.G.players[0].score[1].suns).toBe(0);
  expect(store.G.players[1].score[1].suns).toBe(0);
  expect(store.G.players[2].score[1].suns).toBe(0);
  expect(store.G.players[3].score[1].suns).toBe(0);

  expect(store.ctx.currentPlayer).toBe("0");

  client.moves.invoke();
  client.moves.pass();
  client.moves.pass();
  client.moves.pass();
  client.moves.bid(1);
  client.moves.invoke();
  client.moves.pass();
  client.moves.pass();
  client.moves.bid(2);
  client.moves.invoke();
  client.moves.pass();
  client.moves.bid(3);
  client.moves.invoke();
  client.moves.bid(4);
  store = client.store.getState();
  expect(store.ctx.gameover).toBeDefined();
  expect(store.G.epoch).toBe(3);
  expect(store.G.players[0].score[2].monument).toBe(5 + 3);
  expect(store.G.players[1].score[2].monument).toBe(15 + 1);
  expect(store.G.players[2].score[2].monument).toBe(15);
  expect(store.G.players[3].score[2].monument).toBe(10 + 10);
  expect(store.G.players[0].score[2].suns).toBe(5);
  expect(store.G.players[1].score[2].suns).toBe(-5);
  expect(store.G.players[2].score[2].suns).toBe(0);
  expect(store.G.players[3].score[2].suns).toBe(0);
});

test("score suns equal", () => {
  const RaTest = {
    ...Ra,
    setup: ctx => {
      const players = Players([[2], [2]]);
      const G: GameState = {
        epoch: 3,
        sun: 2,
        ra: null,
        players: players,
        raTrack: [],
        auctionTrack: [],
        tiles: []
      };
      return G;
    }
  };

  const client: any = Client({ numPlayers: 2, game: RaTest });

  var store: { G: GameState; ctx: any };

  client.moves.invoke();
  client.moves.pass();
  client.moves.bid(2);
  client.moves.invoke();
  client.moves.bid(2);
  store = client.store.getState();
  expect(store.G.epoch).toBe(3);
  expect(store.G.players[0].score[1].suns).toBe(0);
  expect(store.G.players[1].score[1].suns).toBe(0);
});
