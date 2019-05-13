import { Client } from "boardgame.io/client";
import { Ra } from "./game";
import Setup, { GameState } from "./setup";
import { Tile, TileType, RiverType, CivilizationType } from "./tile";
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

  expect(store.G.players[0].points).toBe(10 + 3 - 5 - 5);
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

  expect(store.G.players[0].points).toBe(10 + 5);
  expect(store.G.players[1].points).toBe(10 - 5 - 2);
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

  expect(store.G.players[0].points).toBe(10 + 3 + 1);
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

  expect(store.G.players[0].points).toBe(10 + 10);
  expect(store.G.players[1].points).toBe(10);
  expect(store.G.players[2].points).toBe(10 - 5);
});
