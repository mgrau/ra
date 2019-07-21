import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/button";
import Container from "@material-ui/core/container";

import Multiplayer from "./multiplayer";
import Local from "./local";

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/multiplayer" component={Multiplayer} />
      <Route exact path="/local" component={Local} />
      <Route path="/join/:id" component={JoinMultiplayer} />
    </Router>
  );
}

function JoinMultiplayer({ match }) {
  return <Multiplayer gameID={match.params.id} />;
}

function Home() {
  return (
    <Container maxWidth="sm">
      <Link to="/multiplayer">
        <Button variant="contained">Online Multiplayer</Button>
      </Link>
      <Link to="/local">
        <Button variant="contained">Local Multiplayer</Button>
      </Link>
    </Container>
  );
}
