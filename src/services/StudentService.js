import axios from "axios";
import { URL } from '../constants/constants';

const STUD_DETAILS = URL + "student/details";
const STUD_COURSES = URL + "student/courses";

class StudentService {

  getStudentDetails() {
    const config = {
      method: 'get',
      url: STUD_DETAILS,
      withCredentials: true,
    };

    return axios(config);
  }

  getStudentCourses() {
    const config = {
      method: 'get',
      url: STUD_COURSES,
      withCredentials: true,
    };

    return axios(config);
  }

}

export default new StudentService();