import React from "react";
import axios from "axios";

import Button from "@material-ui/core/button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import { Client } from "boardgame.io/react";
import { Ra } from "./game/game.ts";
import RaBoard from "./board/board";

const StateEnum = {
  CREATE: 1,
  JOIN: 2,
  WAITING: 3,
  READY: 4
};

export default class Multiplayer extends React.Component {
  constructor(props) {
    super(props);
    this.server = `http://${window.location.hostname}:5001/games/ra`;
    this.state = {
      state: StateEnum.CREATE,
      name: "",
      numPlayers: 2,
      playerID: null,
      gameID: null,
      credentials: null,
      joinLink: null,
      players: []
    };
  }

  componentDidMount() {
    if (this.props.gameID == undefined) {
      this.setState({ state: StateEnum.CREATE });
    } else {
      this.setState(
        {
          state: StateEnum.JOIN,
          gameID: this.props.gameID
        },
        () => this.getRoom()
      );
    }
  }

  create = async () => {
    if (this.state.name != "") {
      const response = await axios.post(`${this.server}/create`, {
        numPlayers: this.state.numPlayers
      });

      this.setState({ gameID: response.data.gameID }, () => {
        this.setState({
          joinLink: `${window.location.hostname}:${window.location.port}/join/${
            this.state.gameID
          }`
        });
        this.join();
      });
    }
  };

  join = async () => {
    if (this.state.name != "") {
      let room = await this.getRoom();
      const playerID =
        room.players.find(player => player.name == undefined).id + "";
      const response = await axios.post(
        `${this.server}/${this.state.gameID}/join`,
        {
          playerID: playerID,
          playerName: this.state.name
        }
      );
      this.setState({
        playerID: playerID,
        credentials: response.data.playerCredentials,
        state: StateEnum.WAITING
      });
      this.getRoom();
      this.scanner = setInterval(() => this.getRoom(), 1000);
    }
  };

  getRoom = async () => {
    const response = await axios.get(`${this.server}/${this.state.gameID}`);
    this.setState({ players: response.data.players });
    if (response.data.players.every(player => player.name != undefined)) {
      this.setState({ state: StateEnum.READY });
      clearInterval(this.scanner);
    }
    return response.data;
  };

  render() {
    const RaClient = Client({
      numPlayers: this.state.numPlayers,
      game: Ra,
      board: RaBoard,
      debug: false,
      multiplayer: { server: `http://${window.location.hostname}:5001` }
    });

    if (this.state.state == StateEnum.CREATE) {
      return (
        <div>
          <FormControl>
            <TextField
              id="outlined-name"
              label="Name"
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="num-players"
              select
              label="Number of Players"
              value={this.state.numPlayers}
              onChange={event =>
                this.setState({ numPlayers: event.target.value })
              }
              helperText="Please select the number of players"
              margin="normal"
              variant="outlined"
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </TextField>

            <Button
              variant="contained"
              color="primary"
              onClick={() => this.create()}
            >
              Create Game
            </Button>
          </FormControl>
        </div>
      );
    } else if (this.state.state == StateEnum.JOIN) {
      console.log(this.state.players[0]);
      return (
        <div>
          <div>
            <FormControl>
              {`Join ${
                this.state.players[0] == undefined
                  ? ""
                  : this.state.players[0].name
              }'s Game?`}
              <TextField
                id="outlined-name"
                label="Name"
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
                margin="normal"
                variant="outlined"
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.join()}
              >
                Join Game
              </Button>
            </FormControl>
          </div>
        </div>
      );
    } else if (this.state.state == StateEnum.WAITING) {
      const players = this.state.players.map((player, index) => (
        <div key={index}>
          [{player.id}] {player.name == undefined ? "..." : player.name}
        </div>
      ));
      return (
        <div>
          waiting...
          <div>
            <a href={this.state.joinLink}>{this.state.joinLink}</a>
          </div>
          <div>{players}</div>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              this.getRoom();
            }}
          >
            Scan
          </Button>
        </div>
      );
    } else if (this.state.state == StateEnum.READY) {
      return (
        <RaClient
          gameID={this.state.gameID}
          playerID={this.state.playerID}
          credentials={this.state.credentials}
        />
      );
    }
  }
}
