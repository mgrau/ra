import React from "react";
import Button from "@material-ui/core/button";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { Client } from "boardgame.io/react";
import { Ra } from "./game/game.ts";
import RaBoard from "./board/board";

export default class Local extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numPlayers: 2,
      ready: false
    };
  }

  start() {
    this.setState({ ready: true });
  }
  render() {
    const RaClient = Client({
      numPlayers: this.state.numPlayers,
      game: Ra,
      board: RaBoard,
      debug: false
    });

    if (this.state.ready) {
      return <RaClient />;
    } else {
      return (
        <div>
          <FormControl>
            <InputLabel htmlFor="num-players">Players</InputLabel>
            <Select
              value={this.state.numPlayers}
              onChange={event =>
                this.setState({ numPlayers: event.target.value })
              }
              inputProps={{
                name: "numPlayers",
                id: "num-players"
              }}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.start()}
          >
            Start
          </Button>
        </div>
      );
    }
  }
}
