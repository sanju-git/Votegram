import React from "react";
import AdminService from "../../services/AdminService";
import CreatePoll from "./CreatePoll";
import CreateUser from "./CreateUser";
import ShowPolls from "./ShowPolls";

class AdminMainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAllPolls = () => {
    AdminService.getAllPolls().then((response) => {
      if (response.success) {
        return response.polls;
      }
    });
  };
  render() {
    let { option } = this.props;
    if (option === "showCreatePoll") {
      return <CreatePoll />;
    } else if (option === "showCreateUser") {
      return <CreateUser />;
    } else if (option === "showPolls") {
      return <ShowPolls />;
    }
  }
}

export default AdminMainContent;
