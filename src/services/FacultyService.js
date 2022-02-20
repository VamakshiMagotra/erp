import axios from "axios";
import { URL } from '../constants/constants';

const FAC_DETAILS = URL + "faculty/details";
const FAC_COURSES = URL + "faculty/courses";
const FAC_STUDENT = URL + "faculty/student";

class FacultyService {

  getFacultyDetails() {
    const config = {
      method: 'get',
      url: FAC_DETAILS,
      withCredentials: true,
    };

    return axios(config);
  }

  getFacultyCourses() {
    const config = {
      method: 'get',
      url: FAC_COURSES,
      withCredentials: true,
    };

    return axios(config);
  }

  getStudentDetails(entry) {
    const config = {
      method: 'get',
      url: FAC_STUDENT,
      withCredentials: true,
      params: {
        entry,
      },
    };

    return axios(config);
  }

}

export default new FacultyService();