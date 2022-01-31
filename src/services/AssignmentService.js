import axios from "axios";
import { URL } from "../constants/constants";

const ASSIGNMENT = (courseId) => `${URL}course/${courseId}/assignment`;
const UPCOMING = (courseId) => `${URL}course/${courseId}/assignment/upcoming`;
const FACULTY_ASSIGNMENT = (courseId) => `${URL}faculty/course/${courseId}/assignment`;
const FACULTY_SUBMISSIONS = (courseId) => `${URL}faculty/course/${courseId}/assignment/submissions`;
const STUDENT_ASSIGNMENT = (courseId) => `${URL}student/course/${courseId}/assignment`;

class AssignmentService {

  getAllAssignments(id) {
    const config = {
      method: 'get',
      url: ASSIGNMENT(id),
      withCredentials: true,
    };

    return axios(config);
  }

  getOneAssignment(courseId, assignId) {
    const config = {
      method: 'get',
      url: ASSIGNMENT(courseId),
      withCredentials: true,
      params: {
        id: assignId
      },
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

  // faculty

  postNewAssignment(id, data) {
    const config = {
      method: 'post',
      url: FACULTY_ASSIGNMENT(id),
      withCredentials: true,
      data: data,
    };

    return axios(config);
  }

  getAllSubmissions(courseId, assignId) {
    const config = {
      method: 'get',
      url: FACULTY_SUBMISSIONS(courseId),
      withCredentials: true,
      params: {
        id: assignId,
      },
    };

    return axios(config);
  }

  updateMarks(courseId, id, marks) {
    const data = {
      id: id,
      marks: marks,
    };

    const config = {
      method: 'put',
      url: FACULTY_SUBMISSIONS(courseId),
      withCredentials: true,
      data: data,
    };

    return axios(config);
  }

  deleteAssignment(courseId, assignId) {
    const config = {
      method: 'delete',
      url: FACULTY_ASSIGNMENT(courseId),
      withCredentials: true,
      params: {
        id: assignId,
      },
    };

    return axios(config);
  }

  // Student

  getStudentSubmission(courseId, assignId) {
    const config = {
      method: 'get',
      url: STUDENT_ASSIGNMENT(courseId),
      withCredentials: true,
      params: {
        id: assignId
      },
    };

    return axios(config);
  }

  postStudentSubmission(courseId, assignId, file) {
    const data = {
      assignment: {
        id: assignId,
      },
      file: file,
    };

    const config = {
      method: 'post',
      url: STUDENT_ASSIGNMENT(courseId),
      withCredentials: true,
      data: data
    };

    return axios(config);
  }

  updateStudentSubmission(courseId, id, file) {
    const data = {
      id: id,
      file: file,
    };

    const config = {
      method: 'put',
      url: STUDENT_ASSIGNMENT(courseId),
      withCredentials: true,
      data: data,
    };

    return axios(config);
  }

}

export default new AssignmentService();