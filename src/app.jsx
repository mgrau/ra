import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import AllInclusiveIcon from "@material-ui/icons/AllInclusiveOutlined";
import { makeStyles } from "@material-ui/core/styles";

import Multiplayer from "./multiplayer";
import Local from "./local";

export default function App() {
  return (
    <Router>
      <Route exact path="/ra/" component={Home} />
      <Route exact path="/ra/multiplayer" component={Multiplayer} />
      <Route exact path="/ra/local" component={Local} />
      <Route path="/ra/join/:id" component={JoinMultiplayer} />
    </Router>
  );
}

function JoinMultiplayer({ match }) {
  return <Multiplayer gameID={match.params.id} />;
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
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  h1: {
    margin: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function Home() {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AllInclusiveIcon />
        </Avatar>
        <Typography className={classes.h1} component="h1" variant="h4">
          Ra
        </Typography>
        <Button
          className={classes.button}
          fullWidth
          variant="contained"
          component={Link}
          to="/ra/multiplayer"
        >
          Online Multiplayer
        </Button>
        <Button
          className={classes.button}
          fullWidth
          variant="contained"
          component={Link}
          to="/ra/local"
        >
          Local Multiplayer
        </Button>
      </Paper>
    </Container>
  );
}
