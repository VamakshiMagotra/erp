import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CourseService from '../../services/CourseService';
import AttendanceService from '../../services/AttendanceService';

import { courseSchema } from "../../constants/schema";

const TotalAttendance = () => {

  const { id } = useParams();
  const [dataReady, updateDataReady] = useState(false);
  const [data, updateData] = useState(courseSchema);
  const [dayAttendance, updateDayAttendance]=useState({});
  
  const [sessionList, updateSessionList] = useState({
    Tutorial: [],
    Lecture: [],
    Practical: [],
  });

  useEffect(() => {
    CourseService.getCourseDetails(id)
      .then((resp) => {
        updateData({ ...resp.data });
        updateDataReady(true);
      })
      .catch((err) => { console.log("Error" + err) });

    CourseService.getSessionList(id)
      .then((resp) => {
        updateSessionList({ ...resp.data });
      })
      .catch((err) => { console.log("Error" + err) });

  }, [id]);

  const classTypes = ['Lecture', 'Practical', 'Tutorial'];

  const selectDay = (session) => {
    // 2022-01-10 12:0
    const data = {
      date: session.substring(0, 10),
      hours: parseInt(session.substring(11,session.indexOf(':')), 10),
    }
    
    AttendanceService.getFacultyCourseDayAttendance(id,data)
      .then((resp)=>{
        updateDayAttendance(resp.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    
  }

  return (
    <>
      <div className="card-header font-muli bg-custom-sec mb-3 p-4 radius-6">
        <h4 className="mb-0 text-custom-white fw-normal">{data.course.name}</h4>
      </div>

      <div className='card radius-6 font-muli p-4'>
        <h5 className='fw-bold mb-2'>All sessions</h5>
        {
          classTypes.map((type) => {
            if (sessionList[type].length === 0) {
              return <React.Fragment key={type} />;
            }
            return (
              <div key={type} className='mb-3'>
                <h6>{type}</h6>
                <div className='d-flex attendance-chips'>
                  {
                    sessionList[type].map((session, index) => {
                      return (
                        <button
                          key={index}
                          className='btn bg-custom-sec me-2 mb-2 text-custom-white text-nowrap '
                          onClick={() => selectDay(session)}
                        >
                          {session.substring(0, 11)}
                        </button>
                      );
                    })
                  }
                </div>
              </div>

            );
          })
        }
      </div>
      
    </>
  );
}

export default TotalAttendance;