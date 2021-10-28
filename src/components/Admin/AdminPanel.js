import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import history from "../../services/History";
import StorageService from "../../services/StorageService";
import AdminMainContent from "./AdminMainContent";
import CreatePoll from "./CreatePoll";

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { option: "showCreatePoll" };
  }

  componentDidMount() {
    let user = StorageService.getUser();
    this.setState({ user });
  }

  showCreatePoll = () => {
    this.setState({ option: "showCreatePoll" });
  };

  showCreateUser = () => {
    this.setState({ option: "showCreateUser" });
  };

  showPolls = () => {
    this.setState({ option: "showPolls" });
  };

  signOut = () => {
    let done = StorageService.removeUser();
    if (done) {
      history.push("/");
    }
  };

  render() {
    let { option, user = {} } = this.state;
    return (
      <div style={{ maxHeight: "100vh", overflowX: "hidden" }}>
        <div className="row">
          <div className="col-md-2" style={{ maxWidth: "220px" }}>
            <div
              style={{
                height: "100vh",
                backgroundColor: "#2f667b",
                boxShadow: "4px 3px 10px -3px rgba(0,0,0,0.75)",
              }}
            >
              <div className="d-flex align-items-center justify-content-center">
                <Link to="/">
                  <img style={{ height: "50px" }} src="/images/vote.png" />
                </Link>
                <h6
                  style={{
                    paddingTop: 10,
                    color: "white",
                    fontStyle: "italic",
                  }}
                >
                  {"Hey, " + user.name}
                </h6>
              </div>
              <hr style={{ backgroundColor: "#6ea3b7" }} />
              <div>
                <h6
                  onClick={this.showCreatePoll}
                  className={
                    option === "showCreatePoll" ? "activeOption" : "option"
                  }
                >
                  <i className="fa fa-archive" aria-hidden="true"></i> Create
                  poll
                </h6>
                <h6
                  onClick={this.showCreateUser}
                  className={
                    option === "showCreateUser" ? "activeOption" : "option"
                  }
                >
                  <i className="fa fa-user" aria-hidden="true"></i> Create Voter
                </h6>

                <h6
                  onClick={this.showPolls}
                  className={option === "showPolls" ? "activeOption" : "option"}
                >
                  <i className="fa fa-list" aria-hidden="true"></i> Polls
                </h6>

                <h6
                  onClick={this.signOut}
                  className={option === "signout" ? "activeOption" : "option"}
                >
                  <i className="fa fa-sign-out" aria-hidden="true"></i> Sign out
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-10">
            <AdminMainContent option={option} />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPanel;
