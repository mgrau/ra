import { GameState } from "./setup";
import { Tile } from "./tile";

export default function StripSecrets(G: GameState, playerID: string) {
  let secretG = { ...G };

  if (secretG.tiles !== undefined) {
    secretG.tiles = [<Tile>{}];
  }

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
