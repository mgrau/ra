import React from "react";
import Collapsible from "react-collapsible";
import Sun from "./sun";
import Actions from "./actions";
import {
  TileType,
  RiverType,
  CivilizationType,
  MonumentType
} from "./../game/tile";
import "./css/player.css";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bid: this.props.bid
    };

    this.bid = this.bid.bind(this);
    this.pass = this.pass.bind(this);
  }

  bid(sun) {
    if (this.props.allowedMoves.includes("bid")) {
      if (this.state.bid == sun) {
        this.props.moves.bid(sun);
        this.setState({ bid: null });
      } else {
        this.setState({ bid: sun });
      }
    }
  }

  pass() {
    if (this.props.allowedMoves.includes("pass")) {
      this.props.moves.pass();
      this.setState({ bid: null });
    }
  }

  render() {
    const ra = this.props.raPlayer ? <span className="raPlayer">Ra!</span> : "";

    const suns = this.props.suns.map((sun, index) => (
      <Sun
        key={index}
        value={sun}
        active={this.props.active}
        selected={sun == this.state.bid && sun != this.props.bid}
        locked={sun == this.props.bid}
        bid={this.bid}
      />
    ));

    const usedSuns = this.props.usedSuns.map((sun, index) => (
      <Sun key={index} value={sun} used={true} />
    ));

    const actions = this.props.active ? (
      <Actions
        pass={this.pass}
        auctionTrackLength={this.props.auctionTrackLength}
        allowedMoves={this.props.allowedMoves}
        moves={this.props.moves}
      />
    ) : (
      ""
    );
    return (
      <div className={"player" + (this.props.active ? " active" : "")}>
        <div>
          {ra} Player {this.props.playerID}
        </div>
        <div className="suns">
          {suns}
          {usedSuns}
        </div>

        <PlayerTiles tiles={this.props.tiles} />
        {actions}
      </div>
    );
  }
}

class PlayerTiles extends React.Component {
  count(tileType) {
    return this.props.tiles.filter(tile => tile.tileType == tileType).length;
  }

  subCount(tileType) {
    return this.props.tiles.filter(tile => tile.subType == tileType).length;
  }

  addRow(tiles, tileType) {
    if (this.count(tileType) > 0) {
      tiles.push(<div key={tileType}>{tileType}</div>);
      tiles.push(
        <div className="tiles" key={tileType + "tiles"}>
          {[...Array(this.count(tileType)).keys()].map((key, index) => (
            <span className={tileType} key={index} />
          ))}
        </div>
      );
    }
  }

  addHeader(tiles, title) {
    if (this.count(title) > 0) {
      tiles.push(
        <div className="tile-header" key={title}>
          {title}
        </div>
      );
    }
  }

  addSubRow(tiles, tileType) {
    if (this.subCount(tileType) > 0) {
      tiles.push(
        <div className="sub-row" key={tileType}>
          {capitalize(tileType).replace(/_/g, " ")}
        </div>
      );
      tiles.push(
        <div key={tileType + "tiles"}>
          {
            <div className="tiles">
              {[...Array(this.subCount(tileType)).keys()].map((key, index) => (
                <span className={tileType} key={index} />
              ))}
            </div>
          }
        </div>
      );
    }
  }

  render() {
    const tiles = [];
    this.addRow(tiles, TileType.Pharaoh);
    this.addRow(tiles, TileType.Gold);
    this.addRow(tiles, TileType.God);

    this.addHeader(tiles, TileType.River);
    this.addSubRow(tiles, RiverType.nile);
    this.addSubRow(tiles, RiverType.flood);

    this.addHeader(tiles, TileType.Civilization);
    this.addSubRow(tiles, CivilizationType.agriculture);
    this.addSubRow(tiles, CivilizationType.art);
    this.addSubRow(tiles, CivilizationType.astronomy);
    this.addSubRow(tiles, CivilizationType.religion);
    this.addSubRow(tiles, CivilizationType.writing);

    this.addHeader(tiles, TileType.Monument);
    this.addSubRow(tiles, MonumentType.fortress);
    this.addSubRow(tiles, MonumentType.obelisk);
    this.addSubRow(tiles, MonumentType.palace);
    this.addSubRow(tiles, MonumentType.pyramid);
    this.addSubRow(tiles, MonumentType.sphinx);
    this.addSubRow(tiles, MonumentType.statue);
    this.addSubRow(tiles, MonumentType.step_pyramid);
    this.addSubRow(tiles, MonumentType.temple);

    return (
      <Collapsible
        trigger={"Tiles: " + this.props.tiles.length}
        transitionTime={100}
      >
        <div className="player-tiles">{tiles}</div>
      </Collapsible>
    );
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
