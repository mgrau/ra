import React from "react";
import ReactTooltip from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./css/score.css";

export default class Score extends React.Component {
  render() {
    const categories = Object.keys(this.props.score[0]).map(category => (
      <tr key={category}>
        <th>{category}</th>
        {this.props.score.map((score, epoch) => (
          <td key={category + epoch}>{score[category]}</td>
        ))}
      </tr>
    ));

    return (
      <div className="score">
        <a data-tip data-for={"score-" + this.props.id}>
          <span className="score fa-layers fa-fw">
            <FontAwesomeIcon icon={faStar} transform="grow-10" />
            <span className="score-text fa-layers-text fa-inverse">
              {this.props.points}
            </span>
          </span>
        </a>
        <ReactTooltip
          id={"score-" + this.props.id}
          place="right"
          type="dark"
          effect="solid"
        >
          <table>
            <tbody>
              <tr>
                <th>Epoch:</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
              </tr>
              {categories}
            </tbody>
          </table>
        </ReactTooltip>
      </div>
    );
  }
}
