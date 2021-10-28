import React from "react";
import { NavLink } from "react-router-dom";
import PollService from "../services/PollService";

// const candidates = [
//   { name: "sanjeev" },
//   { name: "pankaj" },
//   { name: "sashank" },
// ];

class VotingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showVoteBox: true };
  }

  componentDidMount = () => {
    this.getCandidates();
  };

  getCandidates = () => {
    let { pollId } = this.props.match.params;
    PollService.getCandidates(pollId).then((response) => {
      if (response.candidates) {
        this.setState({ candidates: response.candidates });
      } else if (response.message) {
        this.setState({ message: response.message, showVoteBox: false });
      }
    });
  };

  onVote = (index) => {
    let { pollId } = this.props.match.params;
    let { candidates } = this.state;
    let votedCandidate = candidates[index];
    PollService.castVote(votedCandidate.id, pollId).then((response) => {
      if (response.success) {
        this.setState({
          showVoteBox: false,
          message: "Your vote has been added. You'll be notified via email",
        });
      }
    });
  };
  render() {
    let { candidateIndex, candidates = [], message, showVoteBox } = this.state;
    if (showVoteBox) {
      return (
        <div className="d-flex justify-content-center align-items-center mt-1">
          <div
            className="p-1"
            style={{
              width: "400px",
              boxShadow: "4px 3px 10px -3px rgba(0,0,0,0.75)",
              backgroundColor: "white",
              borderRadius: 5,
            }}
          >
            <h3> Candidates list</h3>
            <div
              className="mt-1"
              style={{ border: "1px solid #9a9a9a", borderRadius: 5 }}
            >
              {candidates.length > 0 ? (
                candidates.map((candidate, index) => {
                  return (
                    <div
                      className="d-flex justify-content-between candidate-box"
                      style={{
                        borderRadius: 3,
                        boxShadow: "4px 3px 10px -3px rgba(0,0,0,0.75)",
                        backgroundColor: "#eeeeee",
                        margin: 20,
                        padding: 10,
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>
                        {candidate.candidateName}
                      </div>
                      <div
                        className={
                          candidateIndex === index ? "selected" : "nonSelected"
                        }
                        style={{
                          height: 30,
                          width: 40,
                          cursor: "pointer",
                          borderRadius: 5,
                        }}
                        onClick={() => this.onVote(index)}
                      ></div>
                    </div>
                  );
                })
              ) : (
                <div>{message}</div>
              )}
            </div>
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
            {message}
            <NavLink to="/voter">
              <span>Back to Dashboard</span>
            </NavLink>
          </div>
        </div>
      );
    }
  }
}

export default VotingPage;
