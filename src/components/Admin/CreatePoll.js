import React from "react";
import Select from "react-select";
import AdminService from "../../services/AdminService";

class CreatePoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { success: false };
  }

  componentDidMount() {
    AdminService.getAllUsers().then((response) => {
      let users = response.users;
      let candidateOptions = [];
      users.forEach((user) => {
        candidateOptions.push({
          label: user.name,
          value: user.name,
          id: user._id,
        });
      });
      this.setState({
        users: response.users,
        candidateOptions,
      });
    });
  }

  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangecandidate = (options) => {
    let candidates = [];
    options.forEach((option) => {
      candidates.push({ id: option.id, candidateName: option.value });
    });
    this.setState({ candidates });
  };

  submitForm = (e) => {
    e.preventDefault();
    let { name, candidates } = this.state;

    if (!name || !candidates) {
      this.setState({ error: true });
      return;
    }
    AdminService.createPoll(name, candidates).then((response) => {
      if (response.success) {
        this.setState({ success: true });
      }
    });
  };

  render() {
    let { users, candidateOptions, error, success } = this.state;
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
              <h5> Poll has been created </h5>
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
                <h4 className="text-center">New Poll</h4>
                <hr />
                <div className="col-md-6">
                  <div className="form-group">
                    <label style={{ float: "left" }}>Poll Name</label>
                    <input
                      className="form-control form-control-lg"
                      onChange={this.onChangeName}
                    />
                  </div>
                </div>

                <div style={{ float: "left" }} className="col-md-8">
                  <label style={{ float: "left" }}>Candidates</label>
                  <br />
                  <Select
                    className="flex-fill mb-1"
                    placeholder="Candidates"
                    options={candidateOptions}
                    onChange={this.onChangecandidate}
                    isMulti
                  />
                </div>
                <br />
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

export default CreatePoll;
