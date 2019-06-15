import React from "react";

export default class Info extends React.Component {
  render() {
    let info = "";
    if (this.props.ctx.currentPlayer == this.props.playerID) {
      info = "Your Turn";
    } else if (this.props.ctx.phase == "Auction") {
      info = `Waiting for Player ${this.props.ctx.currentPlayer} to bid...`;
    } else if (this.props.ctx.phase == "Draw") {
      info = `Waiting for Player ${this.props.ctx.currentPlayer} to move...`;
    } else if (this.props.ctx.phase == "Discard") {
      info = `Waiting for Player ${this.props.ctx.currentPlayer} to discard...`;
    }
    return <div id="info">{info}</div>;
  }
}
