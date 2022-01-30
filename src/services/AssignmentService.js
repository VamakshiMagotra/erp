import axios from "axios";
import { URL } from "../constants/constants";

const ASSIGNMENT = (courseId) => `${URL}course/${courseId}/assignment`;
const UPCOMING = (courseId) => `${URL}course/${courseId}/assignment/upcoming`;
const FACULTY_ASSIGNMENT = (courseId) => `${URL}faculty/course/${courseId}/assignment`;

class AssignmentService {

  getAllAssignments(id) {
    const config = {
      method: 'get',
      url: ASSIGNMENT(id),
      withCredentials: true,
    };

    return axios(config);
  }

  getUpcomingAssignments(id) {
    const config = {
      method: 'get',
      url: UPCOMING(id),
      withCredentials: true,
    };

    return axios(config);
  }

  postNewAssignment(id, data) {
    const config = {
      method: 'post',
      url: FACULTY_ASSIGNMENT(id),
      withCredentials: true,
      data: data,
    };

    return axios(config);
  }

}

export default new AssignmentService();