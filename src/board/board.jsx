import React from "react";
import Sun from "./sun";
import Tile from "./tile";
import Player from "./player";
import "./css/board.css";
import "./css/colors.css";
import "@fortawesome/fontawesome-free/css/all";
import { raTrackLength, canPass } from "./../game/moves";
import { Count } from "./../game/score";
import { TileType } from "./../game/tile";

export default class RaBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTiles: [],
      godSelect: false
    };

    this.beginGodSelect = this.beginGodSelect.bind(this);
    this.cancelGodSelect = this.cancelGodSelect.bind(this);
    this.submitGodSelect = this.submitGodSelect.bind(this);
    this.selectTile = this.selectTile.bind(this);
  }

  beginGodSelect() {
    this.setState({ godSelect: true, selectedTiles: [] });
  }

  cancelGodSelect() {
    this.setState({ godSelect: false, selectedTiles: [] });
  }

  submitGodSelect() {
    this.props.moves.god(this.state.selectedTiles);
    this.setState({ godSelect: false, selectedTiles: [] });
  }

  selectTile(index) {
    if (this.state.godSelect) {
      if (!this.state.selectedTiles.includes(index)) {
        if (
          this.state.selectedTiles.length <
          Count(
            this.props.G.players[this.props.ctx.currentPlayer].tiles,
            TileType.God
          )
        ) {
          this.setState(prevState => ({
            selectedTiles: [...prevState.selectedTiles, index]
          }));
        }
      } else {
        this.setState(prevState => ({
          selectedTiles: prevState.selectedTiles.filter(i => i != index)
        }));
      }
    }
  }

  componentDidMount() {
    document.documentElement.style.setProperty(
      "--colNum",
      raTrackLength(this.props.ctx.numPlayers)
    );
  }

  render() {
    const epoch = (
      <div id="epoch">
        {this.props.ctx.gameover == undefined
          ? "Epoch " + this.props.G.epoch
          : "Gameover! Player " + this.props.ctx.gameover.winner + " Wins"}
      </div>
    );

    const raTrack = this.props.G.raTrack.map((tile, index) => (
      <Tile key={index} {...tile} />
    ));

    const raSpaces = [
      ...Array(
        raTrackLength(this.props.ctx.numPlayers) - this.props.G.raTrack.length
      ).keys()
    ].map((tile, index) => <div key={index + 8} className="tile space" />);

    const auctionTrack = this.props.G.auctionTrack.map((tile, index) => (
      <Tile
        key={index}
        {...tile}
        selectTile={() => this.selectTile(index)}
        selected={this.state.selectedTiles.includes(index)}
      />
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
        canPass={canPass(this.props.G, this.props.ctx)}
        allowedMoves={this.props.ctx.allowedMoves}
        moves={this.props.moves}
        god={{
          select: this.state.godSelect,
          begin: this.beginGodSelect,
          cancel: this.cancelGodSelect,
          submit: this.submitGodSelect
        }}
        gameover={this.props.ctx.gameover != undefined}
      />
    ));
    return (
      <div>
        {epoch}
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
