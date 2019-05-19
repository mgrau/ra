import { GameState } from "./setup";

export default function StripSecrets(G: GameState, playerID: string) {
  let secretG = { ...G };

  if (secretG.tiles !== undefined) {
    delete secretG.tiles;
  }

  if (secretG.players) {
    secretG.players = secretG.players.map((player, index) => {
      let tempPlayer = player;
      if (index != parseInt(playerID)) {
        delete tempPlayer.points;
        delete tempPlayer.score;
      }
      return tempPlayer;
    });
  }

  return secretG;
}
