import axios from "axios";
import { URL } from "../constants/constants";

const COURSE_DETAILS = URL + "course/";
const COURSE_STUDENTS = (courseId) => (`${URL}faculty/course/${courseId}/attendance/student`);
const COURSE_POST_ANNOUNCEMENT = (course_id) => (`${URL}faculty/course/${course_id}/announcement`);
const COURSE_DELETE_ANNOUNCEMENT = (course_id, announce_id) => (`${URL}faculty/course/${course_id}/announcement/${announce_id}`);

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

  postCourseAnnouncements(courseId, announceData) {
    const data = {
      announcement: {
        title: announceData.title,
        announce: announceData.announcement,
      },
      files: announceData.files.map((file) => {
        return {
          file: file,
        };
      }),
      links: announceData.links.map((link) => {
        return {
          link: link,
        };
      })
    };

    const config = {
      method: 'post',
      url: COURSE_POST_ANNOUNCEMENT(courseId),
      withCredentials: true,
      data: data,
    };

    return axios(config);
  }

  deleteCourseAnnouncement(courseId, announceId) {
    const config = {
      method: 'delete',
      url: COURSE_DELETE_ANNOUNCEMENT(courseId, announceId),
      withCredentials: true,
    };

    return axios(config);
  }

}

export default new CourseService();