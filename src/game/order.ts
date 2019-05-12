import { GameState } from "./game";

const TurnOrder = {
  // OPTIONAL:
  // Override the initial value of playOrder.
  // This is called at the beginning of the phase.
  playOrder: (G: GameState, ctx) => {
    return ctx.playOrder.filter(pos => G.players[pos].suns.length > 0);
  },

  // Get the initial value of playOrderPos.
  // This is called at the beginning of the phase.
  //   first: (G: GameState, ctx) => 0,
  first: (G: GameState, ctx) =>
    ctx.playOrderPos %
    ctx.playOrder.filter(pos => G.players[pos].suns.length > 0).length,

  // Get the next value of playOrderPos.
  // This is called at the end of each turn.
  // The phase ends if this returns undefined.
  //   next: (G: GameState, ctx) => (ctx.playOrderPos + 1) % ctx.numPlayers,
  next: (G: GameState, ctx) =>
    (ctx.playOrderPos + 1) %
    ctx.playOrder.filter(pos => G.players[pos].suns.length > 0).length
};

export default TurnOrder;
