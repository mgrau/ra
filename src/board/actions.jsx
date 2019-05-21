import React from "react";

import "./css/actions.css";
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
          onClick={() => {
            this.props.god.cancel();
            this.props.moves.draw();
          }}
        >
          Draw
        </button>
      );
    }

    if (this.props.allowedMoves.includes("god") && this.props.god.count > 0) {
      if (this.props.god.select) {
        buttons.push(
          <button
            key="god"
            className="spend"
            onClick={() => this.props.god.submit()}
          >
            Spend Tile
          </button>
        );
      } else {
        buttons.push(
          <button key="god" onClick={() => this.props.god.begin()}>
            God Tile
          </button>
        );
      }
    }

    if (this.props.allowedMoves.includes("invoke")) {
      buttons.push(
        <button
          key="ra"
          onClick={() => {
            this.props.god.cancel();
            this.props.moves.invoke();
          }}
        >
          Invoke Ra
        </button>
      );
    }

    if (this.props.canPass && this.props.allowedMoves.includes("pass")) {
      buttons.push(
        <button
          key="pass"
          onClick={() => {
            this.props.god.cancel();
            this.props.pass();
          }}
        >
          Pass
        </button>
      );
    }

    return <div className="actions">{buttons}</div>;
  }
}
