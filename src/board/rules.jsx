import React from "react";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";

import "./css/rules.css";

export default class Rules extends React.Component {
  render() {
    return (
      <div id="rules" tabIndex={-1}>
        <div>
          Pharaoh
          <ul>
            <li>+5 points for most</li>
            <li>-2 points for least</li>
          </ul>
        </div>
        <div>
          Gold
          <ul>
            <li>+3 points</li>
          </ul>
        </div>
        <div>
          God
          <ul>
            <li>+2 points</li>
          </ul>
        </div>
        <div>
          River
          <ul>
            <li>+1 points</li>
            <li>must have at least one Flood</li>
          </ul>
        </div>
        <div>
          Civilization
          <ul>
            <li>0 tiles is -5 points</li>
            <li>3 tiles is +5 points</li>
            <li>4 tiles is +10 points</li>
            <li>5 tiles is +15 points</li>
          </ul>
        </div>
        <div>
          Monument (only scored last epoch)
          <ul>
            <li>3 of the same is +5 points</li>
            <li>4 of the same is +10 points</li>
            <li>5 of the same is +15 points</li>
            <li>1-6 different is +1-6 points</li>
            <li>7 different is +10 points</li>
            <li>8 different is +15 points</li>
          </ul>
        </div>
        <div>
          Suns (only scored last epoch)
          <ul>
            <li>+5 points for the highest total</li>
            <li>-5 points for the lowest total</li>
          </ul>
        </div>
      </div>
    );
  }
}
