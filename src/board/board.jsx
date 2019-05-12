import React from "react";
import Sun from "./sun";
import Tile from "./tile";
import Player from "./player";
import "./css/board.css";

export default class RaBoard extends React.Component {
  render() {
    const raTrack = this.props.G.raTrack.map((tile, index) => (
      <Tile key={index} {...tile} />
    ));

    const auctionTrack = this.props.G.auctionTrack.map((tile, index) => (
      <Tile key={index} {...tile} />
    ));

    const players = this.props.G.players.map((player, index) => (
      <Player
        key={index}
        active={index == this.props.ctx.currentPlayer}
        playerID={index}
        {...player}
        auctionTrackLength={this.props.G.auctionTrack.length}
        allowedMoves={this.props.ctx.allowedMoves}
        moves={this.props.moves}
      />
    ));
    return (
      <div>
        {this.props.ctx.phase}
        <div id="ra-board">
          <div id="ra-track">{raTrack}</div>
          <div id="sun-space">
            <Sun value={this.props.G.sun} />
          </div>
          <div id="auction-track">{auctionTrack}</div>
        </div>
        <div id="players">{players}</div>
      </div>
    );
  }
}
