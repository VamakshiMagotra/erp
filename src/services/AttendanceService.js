import axios from "axios";
import { URL } from "../constants/constants";

const STUDENT_ATTENDANCE = URL + "student/course/attendance";
const STUDENT_COURSE_ATTENDANCE = (id) => (`${URL}student/course/${id}/attendance`);
const FACULTY_COURSE_ATTENDANCE = (id) => (`${URL}faculty/course/${id}/attendance`);
const FACULTY_STUDENT_ATTENDANCE = (courseId, studId) => (`${URL}faculty/course/${courseId}/attendance/student/${studId}`);

class AttendanceService {

  getStudentCompleteAttendance() {
    const config = {
      method: 'get',
      url: STUDENT_ATTENDANCE,
      withCredentials: true,
    };

    return axios(config);
  }

  getStudentCourseAttendance(courseId) {
    const config = {
      method: 'get',
      url: STUDENT_COURSE_ATTENDANCE(courseId),
      withCredentials: true
    };

    return axios(config);
  }

  postFacultyAttendance(courseId, data) {
    const config = {
      method: 'post',
      url: FACULTY_COURSE_ATTENDANCE(courseId),
      data: data,
      withCredentials: true,
    };

    return axios(config);
  }

  getFacultyCourseDayAttendance(courseId, data) {
    console.log(data);
    const config = {
      method: 'get',
      url: FACULTY_COURSE_ATTENDANCE(courseId),
      withCredentials: true,
      params : data,
    };

    return axios(config);
  }

  getFacultyStudentAttendance(courseId, studentId) {
    const config = {
      method: 'get',
      url: FACULTY_STUDENT_ATTENDANCE(courseId, studentId),
      withCredentials: true,
    };

    return axios(config);
  }

}

export default new AttendanceService();