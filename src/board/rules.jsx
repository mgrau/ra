import React from "react";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";

import "./css/rules.css";

export default class Rules extends React.Component {
  render() {
    return (
      <div id="rules" tabIndex={-1}>
        <DialogContent>
          These are the rules.
          <Typography variant="h6" id="modal-title">
            Text in a modal
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </DialogContent>
      </div>
    );
  }
}
