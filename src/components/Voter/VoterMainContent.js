import React from "react";
import AdminService from "../../services/AdminService";
import ShowPolls from "./../Admin/ShowPolls";

class VoterMainContent extends React.Component {
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
    if (option === "showPolls") {
      return <ShowPolls />;
    }
  }
}

export default VoterMainContent;
