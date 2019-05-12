export interface Tile {
  tileType: TileType;
  subType:
    | void
    | string
    | RiverType
    | CivilizationType
    | MonumentType
    | DisasterType;
}

export enum TileType {
  Ra = "Ra",
  Pharaoh = "Pharaoh",
  Gold = "Gold",
  God = "God",
  River = "River",
  Civilization = "Civilization",
  Monument = "Monument",
  Disaster = "Disaster"
}

export enum RiverType {
  flood = "flood",
  nile = "nile"
}

export enum CivilizationType {
  astronomy = "astronomy",
  agriculture = "agriculture",
  writing = "writing",
  religion = "religion",
  art = "art"
}

export enum MonumentType {
  fortress = "fortress",
  obelisk = "obelisk",
  palace = "palace",
  pyramid = "pyramid",
  temple = "temple",
  statue = "statue",
  step_pyramid = "step_pyramid",
  sphinx = "sphinx"
}

export enum DisasterType {
  war = "war",
  funeral = "funeral",
  drought = "drought",
  earthquake = "earthquake"
}

export default function Tiles() {
  let tiles: Array<Tile> = [];

  // 30 Ra tiles
  for (var i: number = 0; i < 30; i++) {
    tiles.push(<Tile>{ tileType: TileType.Ra });
  }

  // 25 pharaoh tiles
  for (var i: number = 0; i < 25; i++) {
    tiles.push(<Tile>{ tileType: TileType.Pharaoh });
  }

  // 5 gold tiles
  for (var i: number = 0; i < 5; i++) {
    tiles.push(<Tile>{ tileType: TileType.Gold });
  }

  // 8 god tiles
  // named anubis, bastet, khnum, horus, seth, sobek, thoth, uto
  tiles.push(<Tile>{ tileType: TileType.God, subType: "Anubis" });
  tiles.push(<Tile>{ tileType: TileType.God, subType: "Bastet" });
  tiles.push(<Tile>{ tileType: TileType.God, subType: "Khnum" });
  tiles.push(<Tile>{ tileType: TileType.God, subType: "Horus" });
  tiles.push(<Tile>{ tileType: TileType.God, subType: "Seth" });
  tiles.push(<Tile>{ tileType: TileType.God, subType: "Sobek" });
  tiles.push(<Tile>{ tileType: TileType.God, subType: "Thoth" });
  tiles.push(<Tile>{ tileType: TileType.God, subType: "Uto" });

  // river tiles
  // 25 nile tiles
  for (var i: number = 0; i < 25; i++) {
    tiles.push(<Tile>{ tileType: TileType.River, subType: RiverType.nile });
  }
  // 12 flood tiles
  for (var i: number = 0; i < 12; i++) {
    tiles.push(<Tile>{ tileType: TileType.River, subType: RiverType.flood });
  }

  // civilization tiles
  // 5 astronomy tiles
  // 5 agriculture tiles
  // 5 writing tiles
  // 5 religion tiles
  // 5 art tiles
  for (var i: number = 0; i < 5; i++) {
    tiles.push(<Tile>{
      tileType: TileType.Civilization,
      subType: CivilizationType.agriculture
    });
    tiles.push(<Tile>{
      tileType: TileType.Civilization,
      subType: CivilizationType.art
    });
    tiles.push(<Tile>{
      tileType: TileType.Civilization,
      subType: CivilizationType.astronomy
    });
    tiles.push(<Tile>{
      tileType: TileType.Civilization,
      subType: CivilizationType.religion
    });
    tiles.push(<Tile>{
      tileType: TileType.Civilization,
      subType: CivilizationType.writing
    });
  }

  // monuments
  // 5 fortress tiles
  // 5 obelisk tiles
  // 5 palace tiles
  // 5 pyramid tiles
  // 5 temple tiles
  // 5 statue tiles
  // 5 step pyramid tiles
  // 5 sphinx tiles
  for (var i: number = 0; i < 5; i++) {
    tiles.push(<Tile>{
      tileType: TileType.Monument,
      subType: MonumentType.fortress
    });
    tiles.push(<Tile>{
      tileType: TileType.Monument,
      subType: MonumentType.obelisk
    });
    tiles.push(<Tile>{
      tileType: TileType.Monument,
      subType: MonumentType.palace
    });
    tiles.push(<Tile>{
      tileType: TileType.Monument,
      subType: MonumentType.pyramid
    });
    tiles.push(<Tile>{
      tileType: TileType.Monument,
      subType: MonumentType.sphinx
    });
    tiles.push(<Tile>{
      tileType: TileType.Monument,
      subType: MonumentType.statue
    });
    tiles.push(<Tile>{
      tileType: TileType.Monument,
      subType: MonumentType.step_pyramid
    });
    tiles.push(<Tile>{
      tileType: TileType.Monument,
      subType: MonumentType.temple
    });
  }

  // disasters
  // 4 war tiles - discard 2 civilization tiles
  // 2 funeral tiles - discard 2 pharoah tiles
  // 2 drought tiles - discard 2 river tiles, flood preferred
  // 2 earthquake tiles - discard 2 monument tiles
  tiles.push(<Tile>{ tileType: TileType.Disaster, subType: DisasterType.war });
  tiles.push(<Tile>{ tileType: TileType.Disaster, subType: DisasterType.war });
  tiles.push(<Tile>{ tileType: TileType.Disaster, subType: DisasterType.war });
  tiles.push(<Tile>{ tileType: TileType.Disaster, subType: DisasterType.war });
  tiles.push(<Tile>{
    tileType: TileType.Disaster,
    subType: DisasterType.drought
  });
  tiles.push(<Tile>{
    tileType: TileType.Disaster,
    subType: DisasterType.drought
  });
  tiles.push(<Tile>{
    tileType: TileType.Disaster,
    subType: DisasterType.funeral
  });
  tiles.push(<Tile>{
    tileType: TileType.Disaster,
    subType: DisasterType.funeral
  });
  tiles.push(<Tile>{
    tileType: TileType.Disaster,
    subType: DisasterType.earthquake
  });
  tiles.push(<Tile>{
    tileType: TileType.Disaster,
    subType: DisasterType.earthquake
  });

  return tiles;
}
