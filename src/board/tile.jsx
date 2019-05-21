import React from "react";

import "./css/tile.css";

export default class Tile extends React.PureComponent {
  render() {
    return (
      <div
        className={
          "tile " +
          this.props.tileType +
          " " +
          this.props.subType +
          (this.props.selected ? " selected" : "")
        }
        onClick={() => this.props.selectTile()}
      >
        <div>{this.props.tileType}</div>
        <div>{this.props.subType}</div>
      </div>
    );
  }
}
