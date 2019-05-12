import React from "react";

import "./css/sun.css";

export default class Sun extends React.PureComponent {
  render() {
    return (
      <div
        className={
          "sun" +
          (this.props.used ? " used" : "") +
          (this.props.selected ? " selected" : "") +
          (this.props.locked ? " locked" : "")
        }
        onClick={() => {
          if (this.props.active) {
            this.props.bid(this.props.value);
          }
        }}
      >
        {this.props.value}
      </div>
    );
  }
}
