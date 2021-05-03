import React from "react";
import { Link } from "react-router-dom";
import StorageService from "./services/StorageService";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  componentDidMount() {
    let isLoggedIn = StorageService.isLoggedIn();
    let navTo = null;
    if (isLoggedIn) {
      let user = StorageService.getUser();
      if (user.type == "V") {
        navTo = "/voter";
      } else if (user.type == "A") {
        navTo = "/admin";
      }
    }
    this.setState({ isLoggedIn, navTo });
  }

  render() {
    let { isLoggedIn, navTo } = this.state;
    return (
      <div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #235b71, #257391, #278bb2, #28a4d4, #29bef8)",
            color: "white",
            height: 550,
          }}
        >
          <div className="d-flex justify-content-between align-items-center py-2">
            <div style={{ marginLeft: "3rem" }}>
              <h2
                href="#"
                style={{
                  cursor: "pointer",
                  fontSize: "26px !important",
                  fontWeight: "bolder",
                }}
                className="navbar-brand text-white"
              >
                Votegram
              </h2>
            </div>

            {isLoggedIn && (
              <Link to={navTo} className="nav-option">
                <h6 className="navbar-brand text-white">Dashboard</h6>
              </Link>
            )}
            {!isLoggedIn && (
              <Link to="/signin" className="nav-option">
                <h6 className="navbar-brand text-white">Sign in</h6>
              </Link>
            )}
          </div>
          <div
            style={{ justifyContent: "space-around", padding: 40 }}
            className="row d-flex align-items-center "
          >
            <div className="col-md-3">
              <div>
                <img
                  className="vote-icon"
                  style={{ height: "150px" }}
                  src="/images/vote.png"
                />
              </div>
              <h2>Online Voting Portal</h2>
              <p className="quote" style={{ fontStyle: "oblique" }}>
                Votegram - an online voting portal. On Votegram you can create
                polls and vote and get the insights of the results as visual
                representation.
              </p>
            </div>
            <div className="col-md-3 quote">
              <h2 style={{ fontStyle: "oblique" }}>
                " We all have to vote like our lives and the world depend on it,
                because they do. The only way to be certain of the future is to
                make it ourselves."
              </h2>
              <h5 style={{ float: "right", fontStyle: "oblique" }}>
                -Billie Ellish
              </h5>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="row">
            <div className="col-lg-2"></div>
            <div className="col-lg-2">
              <div className="card quote">
                <div style={{ height: "150px" }} className="card-image p-2">
                  <img
                    // className="quote"
                    style={{ height: "150px" }}
                    src="/images/create.png"
                  />
                </div>
                <div className="card-body mt-4">
                  <h3 className="heading heading-5 strong-500">Create polls</h3>
                  <p className="card-content">
                    You can create various polls and add the candidates as well
                    as voters
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-2">
              <div className="card quote">
                <div style={{ height: "150px" }} className="card-image p-2">
                  <img
                    // className="quote"
                    style={{ height: "150px" }}
                    src="/images/insights.png"
                  />
                </div>
                <div className="card-body mt-4">
                  <h3 className="heading heading-5 strong-500">Get insights</h3>
                  <p className="card-content">
                    Poll results data are represented in graphical format for
                    ease of understand
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-2">
              <div className="card quote">
                <div style={{ height: "150px" }} className="card-image p-2">
                  <img
                    // className="quote"
                    style={{ height: "150px" }}
                    src="/images/mail.png"
                  />
                </div>
                <div className="card-body mt-4">
                  <h3 className="heading heading-5 strong-500">
                    Notify voters
                  </h3>
                  <p className="card-content">
                    Results of the polls would be informed to the users via
                    email
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-2">
              <div className="card quote">
                <div style={{ height: "150px" }} className="card-image p-2">
                  <img
                    // className="quote"
                    style={{ height: "150px" }}
                    src="/images/secured.png"
                  />
                </div>
                <div className="card-body mt-4">
                  <h3 className="heading heading-5 strong-500">Stay secured</h3>
                  <p className="card-content">
                    All the candidates are authenticated and validated before
                    every task
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
