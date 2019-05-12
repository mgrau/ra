import React from "react";

export default class Actions extends React.PureComponent {
  render() {
    let buttons = [];

    if (
      this.props.allowedMoves.includes("draw") &&
      this.props.auctionTrackLength < 8
    ) {
      buttons.push(
        <button
          key="draw"
          accessKey="d"
          onClick={() => this.props.moves.draw()}
        >
          Draw
        </button>
      );
    }

    if (this.props.allowedMoves.includes("invoke")) {
      buttons.push(
        <button key="ra" onClick={() => this.props.moves.invoke()}>
          Invoke Ra
        </button>
      );
    }

    if (this.props.allowedMoves.includes("pass")) {
      buttons.push(
        <button key="pass" onClick={() => this.props.pass()}>
          Pass
        </button>
      );
    }

    return <div className="actions">{buttons}</div>;
  }
}
