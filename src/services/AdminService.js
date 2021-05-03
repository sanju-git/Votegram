import http from "./Ajax";

class AdminService {
  static getAllUsers() {
    return http.get("/api/get-all-users").then((response) => {
      if (response.success) {
        return response;
      } else {
        throw new Error();
      }
    });
  }

  static createPoll(name, candidates) {
    return http.post("/api/addPoll", { name, candidates }).then((response) => {
      if (response.success) {
        return response;
      } else {
        throw new Error();
      }
    });
  }

  static CreateUser(name, email, rollNo, password) {
    return http
      .post("/api/register", { name, email, rollNo, password })
      .then((response) => {
        if (response.success) {
          return response;
        } else {
          throw new Error();
        }
      });
  }

  static getAllPolls() {
    return http.get("/api/get-all-polls").then((response) => {
      if (response.success) {
        return response;
      } else {
        throw new Error();
      }
    });
  }

  static getPollStats(pollId) {
    return http.get("/api/get-poll-stats/" + pollId).then((response) => {
      if (response.success) {
        return response;
      } else {
        throw new Error();
      }
    });
  }
}

export default AdminService;
