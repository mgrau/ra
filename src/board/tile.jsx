import React from "react";

import "./css/tile.css";

export default class Tile extends React.PureComponent {
  render() {
    const subType =
      this.props.subType != undefined ? (
        <div>{this.props.subType.replace(/_/g, " ")}</div>
      ) : (
        ""
      );

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
        {subType}
      </div>
    );
  }
}
