import axios from "axios";
import { URL } from "../constants/constants";

const COURSE_DETAILS = URL + "course/";
const COURSE_STUDENTS = (courseId) => (`${URL}faculty/course/${courseId}/attendance/student`);

class CourseService {
  
  getCourseDetails(courseId) {
    const config = {
      method: 'get',
      url: COURSE_DETAILS + courseId,
      withCredentials: true,
    };
    
    return axios(config);
  }

  getCourseStudents(courseId) {
    const config = {
      method: 'get',
      url: COURSE_STUDENTS(courseId),
      withCredentials: true,
    };

    return axios(config);
  }
}

export default new CourseService();