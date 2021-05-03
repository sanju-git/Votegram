import React from "react";
import AdminService from "../../services/AdminService";
import PollService from "../../services/PollService";
import StorageService from "../../services/StorageService";
import VotingPage from "../VotingPage";
import PollStats from "./PollStats";

class ShowPolls extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showStats: false };
  }

  componentDidMount() {
    AdminService.getAllPolls().then((response) => {
      this.setState({
        polls: response.polls,
      });
    });
  }

  getPoll = (index) => {
    let user = StorageService.getUser();
    let { polls } = this.state;
    let poll = polls[index];
    if (user.type === "A") {
      this.setState({ poll, showStats: true });
    } else if (user.type === "V") {
      if (poll.completed) {
        this.setState({ poll, showStats: true });
      } else {
        this.setState({ showVotingPage: true, pollId: poll._id });
      }
    }
  };

  render() {
    let { polls = [], pollId, showVotingPage, showStats, poll } = this.state;
    if (showStats) {
      return <PollStats poll={poll} />;
    }
    if (showVotingPage) {
      return <VotingPage pollId={pollId} />;
    }
    if (polls.length > 0) {
      return (
        <div style={{ padding: 50 }}>
          <div className="row">
            {polls.map((poll, index) => {
              return (
                <div className="col-md-3">
                  <div className="card" onClick={() => this.getPoll(index)}>
                    <div
                      className="card-body"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <h3
                        style={{ textTransform: "capitalize" }}
                        className="heading heading-5 strong-500"
                      >
                        {poll.name}
                      </h3>
                      <div>
                        <span className="badge bg-base-1 text-uppercase mb-3">
                          {poll.status || "ACTIVE"}
                        </span>
                      </div>
                      <div>
                        {poll.winner && (
                          <span className="badge winner-badge bg-base-1 text-uppercase mb-3">
                            {"Winner - " + poll.winner.name || "ACTIVE"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{ height: "100vh" }}
          className="d-flex justify-content-center align-items-center mt-1"
        >
          <div
            className="p-2"
            style={{
              width: "400px",
              boxShadow: "4px 3px 10px -3px rgba(0,0,0,0.75)",
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            No polls available
          </div>
        </div>
      );
    }
  }
}

export default ShowPolls;
