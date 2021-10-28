import http from "./Ajax";
class PollService {
  static getCandidates(pollId) {
    return http.get("/api/get-candidates/" + pollId).then((response) => {
      if (response.success && response.candidates) {
        return response;
      } else if (response.success && response.message) {
        return response;
      } else {
        throw new Error();
      }
    });
  }

  static castVote(candidateId, pollId) {
    return http
      .post("/api/cast-vote", { candidateId, pollId })
      .then((response) => {
        if (response.success) {
          return response;
        } else {
          throw new Error();
        }
      });
  }

  static getPoll(pollId) {
    return http.get("/api/poll/" + pollId).then((response) => {
      if (response.success) {
        return response;
      } else {
        throw new Error();
      }
    });
  }
}

export default PollService;
