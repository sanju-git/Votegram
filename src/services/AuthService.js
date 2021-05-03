import http from "./Ajax";
import StorageService from "./StorageService";

function createLoggedInUserState(user, token) {
  return {
    _id: user._id,
    name: user.name,
    token: token,
    email: user.email,
    phone: user.phone,
    city: user.city,
    type: user.type,
  };
}

class AuthService {
  static onLogin(rollNo, password) {
    return http.post("/api/login", { rollNo, password }).then((response) => {
      if (response.success) {
        let lUser = createLoggedInUserState(response.user, response.token);
        StorageService.storeLoginUser(lUser);
        return response;
      } else {
        throw new Error();
      }
    });
  }
}

export default AuthService;
