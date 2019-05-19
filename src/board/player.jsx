import React from "react";
import Sun from "./sun";
import Actions from "./actions";

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
        <div>tiles: {this.props.tiles.length}</div>
        {actions}
      </div>
    );
  }
}
