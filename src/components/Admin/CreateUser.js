import React from "react";
import Select from "react-select";
import AdminService from "../../services/AdminService";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeRollNo = (e) => {
    this.setState({ rollNo: e.target.value });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  submitForm = (e) => {
    e.preventDefault();
    let { name, email, rollNo, password } = this.state;

    if (!name || !email || !rollNo || !password) {
      this.setState({ error: true });
      return;
    }
    AdminService.CreateUser(name, email, rollNo, password).then((response) => {
      if (response.success) {
        this.setState({ success: true });
      }
    });
  };

  render() {
    let { error, success } = this.state;
    if (success) {
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
            <span>
              <h5> User has been created </h5>
              <i className="fa fa-check-circle" aria-hidden="true" />
            </span>
          </div>
        </div>
      );
    }
    return (
      <div
        style={{ height: "100vh" }}
        className="row d-flex justify-content-center align-items-center"
      >
        <div className="col-md-5">
          <div
            className="card form-card form-card--style-2"
            style={{
              border: "1px solid #f1f1f1",
              padding: "15px",
            }}
          >
            <div className="form-body">
              <form className="form-default" onSubmit={this.submitForm}>
                {error && (
                  <div
                    style={{ border: "2px solid #6d0000", color: "#6d0000" }}
                  >
                    Fill all fields
                  </div>
                )}
                <h4 className="text-center">New User</h4>
                <hr />
                <div className="col-md-6">
                  <div className="form-group">
                    <label style={{ float: "left" }}>Name</label>
                    <input
                      className="form-control form-control-lg"
                      onChange={this.onChangeName}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label style={{ float: "left" }}>Roll no</label>
                    <input
                      className="form-control form-control-lg"
                      onChange={this.onChangeRollNo}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label style={{ float: "left" }}>Email</label>
                    <input
                      className="form-control form-control-lg"
                      onChange={this.onChangeEmail}
                      type="email"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label style={{ float: "left" }}>Password</label>
                    <input
                      className="form-control form-control-lg"
                      onChange={this.onChangePassword}
                      type="password"
                    />
                  </div>
                </div>{" "}
                <div className="mt-2 d-flex justify-content-end">
                  <button type="submit" className="btn btn-sm btn-primary">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
