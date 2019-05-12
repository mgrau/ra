import Tiles, {
  TileType,
  CivilizationType,
  DisasterType,
  MonumentType,
  RiverType
} from "./tile";

test("distribution of tiles", () => {
  const tiles = Tiles();

  // 180 total tiles
  expect(tiles.length).toBe(180);

  // 30 Ra tiles
  expect(tiles.filter(tile => tile.tileType == TileType.Ra).length).toBe(30);

  // 5 astronomy tiles
  expect(
    tiles.filter(tile => tile.subType == CivilizationType.astronomy).length
  ).toBe(5);
  // 5 agriculture tiles
  expect(
    tiles.filter(tile => tile.subType == CivilizationType.agriculture).length
  ).toBe(5);
  // 5 writing tiles
  expect(
    tiles.filter(tile => tile.subType == CivilizationType.writing).length
  ).toBe(5);
  // 5 religion tiles
  expect(
    tiles.filter(tile => tile.subType == CivilizationType.religion).length
  ).toBe(5);
  // 5 art tiles
  expect(
    tiles.filter(tile => tile.subType == CivilizationType.art).length
  ).toBe(5);

  // 4 war tiles
  expect(tiles.filter(tile => tile.subType == DisasterType.war).length).toBe(4);

  // 5 fortress tiles
  expect(
    tiles.filter(tile => tile.subType == MonumentType.fortress).length
  ).toBe(5);
  // 5 obelisk tiles
  expect(
    tiles.filter(tile => tile.subType == MonumentType.obelisk).length
  ).toBe(5);
  // 5 palace tiles
  expect(tiles.filter(tile => tile.subType == MonumentType.palace).length).toBe(
    5
  );
  // 5 pyramid tiles
  expect(
    tiles.filter(tile => tile.subType == MonumentType.pyramid).length
  ).toBe(5);
  // 5 temple tiles
  expect(tiles.filter(tile => tile.subType == MonumentType.temple).length).toBe(
    5
  );
  // 5 statue tiles
  expect(tiles.filter(tile => tile.subType == MonumentType.statue).length).toBe(
    5
  );
  // 5 step pyramid tiles
  expect(
    tiles.filter(tile => tile.subType == MonumentType.step_pyramid).length
  ).toBe(5);
  // 5 sphinx tiles
  expect(tiles.filter(tile => tile.subType == MonumentType.sphinx).length).toBe(
    5
  );

  // 2 earthquake tiles
  expect(
    tiles.filter(tile => tile.subType == DisasterType.earthquake).length
  ).toBe(2);

  // 5 gold tiles
  expect(tiles.filter(tile => tile.tileType == TileType.Gold).length).toBe(5);

  // 25 gold tiles
  expect(tiles.filter(tile => tile.tileType == TileType.Pharaoh).length).toBe(
    25
  );

  // 2 funeral tiles
  expect(
    tiles.filter(tile => tile.subType == DisasterType.funeral).length
  ).toBe(2);

  // 25 nile tiles
  expect(tiles.filter(tile => tile.subType == RiverType.nile).length).toBe(25);

  // 2 funeral tiles
  expect(tiles.filter(tile => tile.subType == RiverType.flood).length).toBe(12);

  // 2 drought tiles
  expect(
    tiles.filter(tile => tile.subType == DisasterType.drought).length
  ).toBe(2);
});
