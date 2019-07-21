import React from "react";
import axios from "axios";

import Button from "@material-ui/core/button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import { Client } from "boardgame.io/react";
import { Ra } from "./game/game.ts";
import RaBoard from "./board/board";

const LobbyStateEnum = {
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
      lobbyState: sessionStorage.getItem("lobbyState"),
      name: "",
      numPlayers: 2,
      playerID: sessionStorage.getItem("playerID"),
      gameID: sessionStorage.getItem("gameID"),
      credentials: sessionStorage.getItem("credentials"),
      players: []
    };
  }

  componentDidMount() {
    if (this.state.lobbyState != LobbyStateEnum.READY) {
      if (this.props.gameID == undefined) {
        this.getRoom();
      } else {
        this.setState(
          {
            gameID: this.props.gameID
          },
          () => this.getRoom()
        );
      }
    }

    if (this.state.lobbyState == null) {
      if (this.props.gameID == undefined) {
        this.setLobbyState(LobbyStateEnum.CREATE);
      } else {
        this.setLobbyState(LobbyStateEnum.JOIN);
      }
    } else if (this.state.lobbyState == LobbyStateEnum.JOIN) {
    } else if (this.state.lobbyState == LobbyStateEnum.WAITING) {
      this.scanner = setInterval(() => this.getRoom(), 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.scanner);
  }

  setLobbyState(lobbyState) {
    this.setState({ lobbyState: lobbyState }, () => {
      sessionStorage.setItem("lobbyState", lobbyState);
    });
  }

  create = async () => {
    if (this.state.name != "") {
      const response = await axios.post(`${this.server}/create`, {
        numPlayers: this.state.numPlayers
      });

      const gameID = response.data.gameID;
      this.setState({ gameID: gameID }, () => {
        sessionStorage.setItem("gameID", gameID);
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
      const credentials = response.data.playerCredentials;
      this.setLobbyState(LobbyStateEnum.WAITING);
      this.setState(
        {
          playerID: playerID,
          credentials: credentials
        },
        () => {
          sessionStorage.setItem("playerID", playerID);
          sessionStorage.setItem("credentials", credentials);
        }
      );
      this.scanner = setInterval(() => this.getRoom(), 1000);
    }
  };

  getRoom = async () => {
    if (this.state.gameID != null) {
      const response = await axios.get(`${this.server}/${this.state.gameID}`);
      this.setState({ players: response.data.players });
      if (response.data.players.every(player => player.name != undefined)) {
        this.setLobbyState(LobbyStateEnum.READY);
        clearInterval(this.scanner);
      }
      return response.data;
    }
  };

  joinLink() {
    return `${window.location.hostname}:${window.location.port}/join/${
      this.state.gameID
    }`;
  }

  render() {
    const RaClient = Client({
      numPlayers: this.state.numPlayers,
      game: Ra,
      board: RaBoard,
      debug: false,
      multiplayer: { server: `http://${window.location.hostname}:5001` }
    });

    if (this.state.lobbyState == LobbyStateEnum.CREATE) {
      return (
        <div>
          <FormControl>
            <TextField
              autoComplete="off"
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
    } else if (this.state.lobbyState == LobbyStateEnum.JOIN) {
      return (
        <div>
          <div>
            <FormControl>
              <TextField
                autoComplete="off"
                id="outlined-name"
                label="Name"
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
                margin="normal"
                variant="outlined"
              />

              <FormHelperText>
                {`Join ${
                  this.state.players[0] == undefined ||
                  this.state.players[0].name == undefined
                    ? ""
                    : this.state.players[0].name
                }'s Game?`}
              </FormHelperText>

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
    } else if (this.state.lobbyState == LobbyStateEnum.WAITING) {
      const players = this.state.players.map((player, index) => (
        <div key={index}>
          [{player.id}] {player.name == undefined ? "..." : player.name}
        </div>
      ));

      const link =
        this.state.playerID == "0" ? (
          <a href={this.joinLink()}>{this.joinLink()}</a>
        ) : (
          ""
        );
      return (
        <div>
          {link}
          <div>waiting...</div>
          <div>{players}</div>
        </div>
      );
    } else if (this.state.lobbyState == LobbyStateEnum.READY) {
      return (
        <RaClient
          gameID={this.state.gameID}
          playerID={this.state.playerID}
          credentials={this.state.credentials}
        />
      );
    } else {
      return "";
    }
  }
}
