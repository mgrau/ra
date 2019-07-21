import React from "react";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
        <PlayerSelector
          numPlayers={this.state.numPlayers}
          start={() => this.start()}
          onChange={numPlayers => this.setState({ numPlayers })}
        />
      );
    }
  }
}

function PlayerSelector(props) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography className={classes.h1} component="h1" variant="h5">
          Start a Local Multiplayer Game
        </Typography>
        <TextField
          className={classes.select}
          value={props.numPlayers}
          onChange={event => {
            props.onChange(event.target.value);
          }}
          label="Number of Players"
          select
          fullWidth
          variant="outlined"
          inputProps={{
            name: "numPlayers",
            id: "num-players"
          }}
        >
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </TextField>
        <Button
          className={classes.button}
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => props.start()}
        >
          Start
        </Button>
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  h1: {
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(4)
  },
  select: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
}));
