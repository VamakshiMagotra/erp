import axios from "axios";
import qs from "qs";
import { URL } from '../constants/constants';

const USER_LOGIN = URL + "login";
const USER_VERIFY = URL + "login-verify";
const USER_LOGOUT = URL + "logout";

class UserService {

  loginUser(username, password) {
    const data = qs.stringify({
      username: username,
      password: password,
    });

    const config = {
      method: 'post',
      url: USER_LOGIN,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    return axios(config);
  }

  verifyUser() {
    const config = {
      method: 'get',
      url: USER_VERIFY,
      withCredentials: true,
    };

    return axios(config);
  }

  logoutUser() {
    const config = {
      method: 'get',
      url: USER_LOGOUT,
      withCredentials: true,
    };

    return axios(config);
  }
}

export default new UserService();