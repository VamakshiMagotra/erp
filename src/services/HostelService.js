import axios from "axios";
import { URL } from '../constants/constants';

const HOSTEL_STUD = URL + "hostel/student";
const STUD_UPCOMING = URL + "hostel/student/pass/upcoming";
const STUD_PASS = URL + "hostel/student/pass";
const GET_PASS = (id) =>  (URL + "hostel/pass/" + id);

class HostelService {

  getStudentHostelDetails() {
    const config = {
      method: 'get',
      url: HOSTEL_STUD,
      withCredentials: true,
    };

    return axios(config);
  }

  getStudentUpcomingGatePass() {
    const config = {
      method: 'get',
      url: STUD_UPCOMING,
      withCredentials: true,
    };

    return axios(config);
  }

  postGatePass(data) {
    const config = {
      method: 'post',
      url: STUD_PASS,
      withCredentials: true,
      data: data,
    };

    return axios(config);
  }

  getGatePass(id) {
    const config = {
      method: 'get',
      url: GET_PASS(id),
      withCredentials: true,
    };

    return axios(config);
  }

}

export default new HostelService();