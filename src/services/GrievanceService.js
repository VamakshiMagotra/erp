import axios from "axios";
import { URL } from '../constants/constants';

const STUD_GRIEVANCE = URL + "student/grievance";
const GRIEVANCE_DETAILS = URL + "grievance";
const FACULTY_GRIEVANCE = URL + "faculty/grievance";

class GrievanceService {

  getStudentGrievances = () => {
    const config = {
      method: 'get',
      url: STUD_GRIEVANCE,
      withCredentials: true,
    };

    return axios(config);
  };

  postStudentGrievance = (grievanceData) => {
    const data = {
      grievance: {
        title: grievanceData.title,
        department: grievanceData.department,
        description: grievanceData.description,
      },
      replies: [],
      files: grievanceData.files.map((file) => {
        return {
          file: file,
        };
      }),
    };

    const config = {
      method: 'post',
      url: STUD_GRIEVANCE,
      withCredentials: true,
      data: data,
    };

    return axios(config);
  };

  getGrievanceDetails(id) {
    const config = {
      method: 'get',
      url: GRIEVANCE_DETAILS,
      withCredentials: true,
      params: {
        id: id
      },
    };

    return axios(config);
  };

  getFacultyGrievance(id) {
    const config = {
      method: 'get',
      url: FACULTY_GRIEVANCE,
      withCredentials: true,
      params: {
        status: id,
      },
    };

    return axios(config);
  }

  getNotRead() {
    const config = {
      method: 'get',
      url: FACULTY_GRIEVANCE,
      withCredentials: true,
    };

    return axios(config);
  }

  updateStatus(id, status) {
    const config = {
      method: 'put',
      url: FACULTY_GRIEVANCE,
      withCredentials: true,
      params: {
        id, status,
      }
    };

    return axios(config);
  }

}

export default new GrievanceService();