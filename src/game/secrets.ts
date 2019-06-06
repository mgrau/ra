import { GameState } from "./setup";
import { Tile } from "./tile";

export default function StripSecrets(G: GameState, playerID: string) {
  let secretG = { ...G };

  secretG.tiles = secretG.tiles.concat().sort((a, b) => {
    if (a.tileType == b.tileType) {
      if (a.subType > b.subType) {
        return 1;
      } else if (a.subType < b.subType) {
        return -1;
      }
    } else {
      if (a.tileType > b.tileType) {
        return 1;
      } else if (a.tileType < b.tileType) {
        return -1;
      }
    }
  });

  // if (secretG.players) {
  //   secretG.players = secretG.players.map((player, index) => {
  //     let tempPlayer = player;
  //     if (index != parseInt(playerID)) {
  //       delete tempPlayer.points;
  //       delete tempPlayer.score;
  //     }
  //     return tempPlayer;
  //   });
  // }

  return secretG;
}
