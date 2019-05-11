import React from "react";

import "./css/board.css";

export default class RaBoard extends React.Component {
  render() {
    const raTrack = this.props.G.raTrack.map((tile, index) => (
      <div key={index} className="tile">
        {tile.tileType}
      </div>
    ));

    const auctionTrack = this.props.G.auctionTrack.map((tile, index) => (
      <div key={index} className="tile">
        {tile.tileType}
      </div>
    ));

    const players = this.props.G.players.map((player, index) => (
      <div key={index} className="player">
        <div>Player {index}</div>
        <div>suns: {player.suns}</div>
        <div>used suns: {player.usedSuns}</div>
        <div>tiles: {player.tiles.length}</div>
      </div>
    ));
    return (
      <div id="ra-board">
        {this.props.ctx.phase}
        <div id="ra-track">{raTrack}</div>
        <div id="sun-space">{this.props.G.sun}</div>
        <div id="auction-track">{auctionTrack}</div>
        <div id="players">{players}</div>
      </div>
    );
  }
}
