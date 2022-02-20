import axios from "axios";
import { URL } from '../constants/constants';

const HOSTEL_STUD = URL + "hostel/student";
const STUD_UPCOMING = URL + "hostel/student/pass/upcoming";
const STUD_PASS = URL + "hostel/student/pass";
const GET_PASS = (id) =>  (URL + "hostel/pass/" + id);
const GET_ROOM = URL + "hostel/rooms";
const GET_FACULTY_PASS = URL + "hostel/faculty/pass";
const SIGN_PASS = (id) => (URL + "hostel/faculty/pass/" + id);
const FACULTY_SEARCH = URL + "hostel/faculty/pass/search";

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

  getHostelRooms() {
    const config = {
      method: 'get',
      url: GET_ROOM,
      withCredentials: true,
    };

    return axios(config);
  }

  getFacultyPass() {
    const config = {
      method: 'get',
      url: GET_FACULTY_PASS,
      withCredentials: true,
    };

    return axios(config);
  }

  signFacultyPass(id, allow) {
    const config = {
      method: 'put',
      url: SIGN_PASS(id) + "?allowed=" + allow,
      withCredentials: true,
    };

    return axios(config);
  }

  searchGatePass(entry, history) {
    const config = {
      method: 'get',
      url: FACULTY_SEARCH,
      withCredentials: true,
      params: {
        entry,
        history,
      },
    };

    return axios(config);
  }

}

export default new HostelService();