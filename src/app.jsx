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
        <Route path="/local" component={Local} />
      </div>
    </Router>
  );
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

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>Rendering with React</Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Topic({ match }) {
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}
