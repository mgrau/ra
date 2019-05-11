import { GameState } from "./game";
import EndEpoch from "./epoch";

export default function AuctionEnd(G: GameState) {
  G.ra = null;
  const maxBid = Math.max(...G.players.map(player => player.bid));
  const winner = G.players.find(player => player.bid == maxBid);
  if (winner == undefined) {
    if (G.auctionTrack.length >= 8) {
      G.auctionTrack = [];
    }
    return G;
  }
  winner.usedSuns = [...winner.usedSuns, G.sun];
  winner.tiles = [...winner.tiles, ...G.auctionTrack];
  winner.suns.splice(winner.suns.indexOf(maxBid), 1);
  G.sun = maxBid;
  G.auctionTrack = [];

  if (G.players.every(player => player.suns.length == 0)) {
    EndEpoch(G);
  }
  return G;
}
