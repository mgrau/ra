import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Multiplayer from "./multiplayer";
import Local from "./local";

export default function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/multiplayer" component={Multiplayer} />
        <Route exact path="/local" component={Local} />
        <Route path="/join/:id" component={JoinMultiplayer} />
      </div>
    </Router>
  );
}

function JoinMultiplayer({ match }) {
  return <Multiplayer gameID={match.params.id} />;
}

function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/multiplayer">Online Multiplayer</Link>
        </li>
        <li>
          <Link to="/local">Local Multiplayer</Link>
        </li>
      </ul>
    </div>
  );
}
