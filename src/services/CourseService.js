import axios from "axios";
import { URL } from "../constants/constants";

const COURSE_DETAILS = URL + "course/";

class CourseService {
  
  getCourseDetails(courseId) {
    const config = {
      method: 'get',
      url: COURSE_DETAILS + courseId,
      withCredentials: true,
    };
    
    return axios(config);
  }
}

export default new CourseService();