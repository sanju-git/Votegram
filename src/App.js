import "./App.css";
import Login from "./components/Login";
import React from "react";
import StorageService from "./services/StorageService";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import VoterPanel from "./components/Voter/VoterPanel";
import AdminPanel from "./components/Admin/AdminPanel";
import history from "./services/History";
import VotingPage from "./components/VotingPage";
import PollStats from "./components/Admin/PollStats";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  componentDidMount() {
    let isLoggedIn = StorageService.isLoggedIn();
    this.setState({ isLoggedIn });
  }

  render() {
    let { isLoggedIn } = this.state;
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/:pollId/stats" exact component={PollStats}></Route>
            <Route path="/:userId/:pollId" component={VotingPage}></Route>
            <Route path="/signin" exact component={Login}></Route>
            <Route path="/voter" exact component={VoterPanel}></Route>
            <Route path="/admin" exact component={AdminPanel}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
