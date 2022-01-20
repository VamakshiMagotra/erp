import axios from "axios";
import { URL } from "../constants/constants";

const COMPLETE_TIMETABLE = URL + "timetable";
const TIMETABLE_NEXT = URL + "timetable/next";
const TIMETABLE_NOW = URL + "timetable/now";

class TimeTableService {

  getTimeTable() {
    const config = {
      method: 'get',
      url: COMPLETE_TIMETABLE,
      withCredentials: true,
    };

    return axios(config);
  }

  getNextSchedule() {
    const config = {
      method: 'get',
      url: TIMETABLE_NEXT,
      withCredentials: true,
    };

    return axios(config);
  }

  getCurrentSchedule() {
    const config = {
      method: 'get',
      url: TIMETABLE_NOW,
      withCredentials: true,
    };

    return axios(config);
  }
}

export default new TimeTableService();