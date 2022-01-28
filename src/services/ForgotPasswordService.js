import axios from "axios";
import { URL } from '../constants/constants';

const FORGOT = URL + "user/forgot";
const VERIFY = URL + "user/verify/otp";

class ForgotPasswordService {

  requestOtp(email) {
    const config = {
      method: 'get',
      url: FORGOT,
      withCredentials: true,
      params: {
        email: email,
      }
    };

    return axios(config);
  }

  verifyOtp(email, otp) {
    const config = {
      method: 'post',
      url: VERIFY + "?email=" + email,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(otp),
    };

    return axios(config);
  }

  updatePassword(email, data) {
    const config = {
      method: 'post',
      url: FORGOT + "?email=" + email,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
    };

    return axios(config);
  }

}

export default new ForgotPasswordService();