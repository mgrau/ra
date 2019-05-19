import React from "react";
import Sun from "./sun";
import Tile from "./tile";
import Player from "./player";
import "./css/board.css";
import { raTrackLength } from "./../game/moves";

export default class RaBoard extends React.Component {
  componentDidMount() {
    document.documentElement.style.setProperty(
      "--colNum",
      raTrackLength(this.props.ctx.numPlayers)
    );
  }
  render() {
    const raTrack = this.props.G.raTrack.map((tile, index) => (
      <Tile key={index} {...tile} />
    ));

    const raSpaces = [
      ...Array(
        raTrackLength(this.props.ctx.numPlayers) - this.props.G.raTrack.length
      ).keys()
    ].map((tile, index) => <div key={index + 8} className="tile space" />);

    const auctionTrack = this.props.G.auctionTrack.map((tile, index) => (
      <Tile key={index} {...tile} />
    ));

    const auctionSpaces = [
      ...Array(8 - this.props.G.auctionTrack.length).keys()
    ].map((tile, index) => <div key={index + 8} className="tile space" />);

    const players = this.props.G.players.map((player, index) => (
      <Player
        key={index}
        active={index == this.props.ctx.currentPlayer}
        playerID={index}
        {...player}
        raPlayer={index == this.props.G.ra}
        auctionTrackLength={this.props.G.auctionTrack.length}
        allowedMoves={this.props.ctx.allowedMoves}
        moves={this.props.moves}
      />
    ));
    return (
      <div>
        {this.props.ctx.phase}
        <div id="ra-board">
          <div id="ra-track">
            {raTrack}
            {raSpaces}
          </div>
          <div id="sun-space">
            <Sun value={this.props.G.sun} />
          </div>
          <div id="auction-track">
            {auctionTrack}
            {auctionSpaces}
          </div>
        </div>
        <div id="players">{players}</div>
      </div>
    );
  }
}
