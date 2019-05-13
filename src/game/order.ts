import { GameState } from "./setup";

const TurnOrder = {
  // Get the initial value of playOrderPos.
  // This is called at the beginning of the phase.
  first: (G: GameState, ctx) => ctx.playOrderPos,

  // Get the next value of playOrderPos.
  // This is called at the end of each turn.
  // The phase ends if this returns undefined.
  next: (G: GameState, ctx) => {
    const playOrder = Array.from(
      { length: ctx.numPlayers },
      (x, pos) => (pos + parseInt(ctx.currentPlayer) + 1) % ctx.numPlayers
    );
    return playOrder.find(pos => G.players[pos].suns.length > 0);
  }
};

export default TurnOrder;
