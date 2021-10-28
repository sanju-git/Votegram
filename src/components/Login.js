import React from "react";
import AuthService from "../services/AuthService";
import history from "../services/History";
import StorageService from "../services/StorageService";
import AdminPanel from "./Admin/AdminPanel";
import VoterPanel from "./Voter/VoterPanel";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onChangeRollNo = (e) => {
    this.setState({ rollNo: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  submitForm = (e) => {
    e.preventDefault();
    let { rollNo, password } = this.state;
    if (rollNo && password) {
      AuthService.onLogin(rollNo, password)
        .then((response) => {
          if (response.user) {
            if (response.user.type === "A") {
              history.push("/admin");
            } else if (response.user.type === "V") {
              history.push("/voter");
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  render() {
    return (
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center mt-1"
      >
        <div
          style={{ width: 370 }}
          className="card form-card form-card--style-2"
        >
          <div className="form-header text-center">
            <div className="form-header-icon">
              <i className="fa fa-sign-in" aria-hidden="true"></i>
            </div>
          </div>
          <div style={{ padding: 50 }} className="form-body">
            <div className="text-center px-2">
              <h4 className="heading heading-4 strong-400 mb-4">
                Sign in to your account
              </h4>
            </div>

            <form
              className="form-default"
              role="form"
              onSubmit={this.submitForm}
            >
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label style={{ float: "left" }}>Roll no</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      onChange={this.onChangeRollNo}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group has-feedback">
                    <label style={{ float: "left" }}>Password</label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      onChange={this.onChangePassword}
                    />
                  </div>
                </div>
              </div>

              <button
                className="btn btn-styled btn-lg btn-block btn-base-1 mt-4"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
