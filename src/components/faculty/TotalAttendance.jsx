import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CourseService from '../../services/CourseService';
import AttendanceService from '../../services/AttendanceService';

import { courseSchema } from "../../constants/schema";
import { Loader } from '../common/Loader';

const TotalAttendance = () => {

  const { id } = useParams();
  const [dataReady, updateDataReady] = useState(false);
  const [data, updateData] = useState(courseSchema);
  const [dayAttendance, updateDayAttendance] = useState({});
  const [studAttendance, updateStudAttendance] = useState({});
  const [dayAttAval, updateDayAttAval] = useState(false);
  const [searching, updateSearching] = useState(false);

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
      hours: parseInt(session.substring(11, session.indexOf(':')), 10),
    };

    updateSearching(true);

    AttendanceService.getFacultyCourseDayAttendance(id, data)
      .then((resp) => {
        // console.log(resp.data);
        updateDayAttendance(resp.data);
        updateDayAttAval(true);
        updateStudAttendance(resp.data.students);
        updateSearching(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  const handleChange = (e, checked) => {
    const { name } = e.target;

    updateStudAttendance({
      ...studAttendance,
      [name]: checked,
    });
  }

  const findStudentsPresent = () => {
    let p = 0;
    Object.keys(studAttendance).forEach(e => {
      if(studAttendance[e])
        p++;
    });
    return p;
  }

  if (!dataReady)
    return <Loader className="fa-3x" />

  return (
    <>
      <div className="card-header font-muli bg-custom-sec mb-3 p-4 radius-6">
        <h4 className="mb-0 text-custom-white fw-normal">{data.course.name}</h4>
      </div>

      <div className='card radius-6 font-muli p-4 mb-3'>
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

      {
        (!dayAttAval) ? (
          <></>
        ) : (
          (searching) ? (
            <Loader className="fa-2x" />
          ) : (
            <div className='card radius-6 font-muli p-4'>
              <h5 className='fw-bold'>Attendance</h5>

              <div className='d-flex'>
                <p className='me-2 mb-0'>Date: </p>
                <p className='mb-0'>{dayAttendance.date}</p>
              </div>
              <div className='d-flex'>
                <p className='me-2 mb-0'>Time: </p>
                <p>{dayAttendance.hours}:{(dayAttendance.minutes === 0) ? '00' : dayAttendance.minutes}</p>
              </div>
              <div className='d-flex'>
                <p className='me-2 mb-0'>Total Students: </p>
                <p className='mb-0'>{Object.keys(studAttendance).length}</p>
              </div>
              <div className='d-flex'>
                <p className='me-2 mb-0'>Students Present: </p>
                <p>{findStudentsPresent()}</p>
              </div>

              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Entry No</th>
                    <th>Name</th>
                    <th>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.keys(studAttendance).map((elem) => {
                      const entryNum = elem.substring(0, 8);
                      const name = elem.substring(9);
                      console.log(studAttendance[elem]);
                      return (
                        <>
                          <tr>
                            <td>{entryNum}</td>
                            <td>{name}</td>
                            <td>
                              <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input
                                  type="radio"
                                  className="btn-check"
                                  name={elem}
                                  id={`present-${entryNum}`}
                                  value={true}
                                  checked={studAttendance[elem]}
                                  onChange={(e) => { handleChange(e, true) }}
                                />
                                <label className="btn btn-outline-sec" htmlFor={`present-${entryNum}`}>Present</label>

                                <input
                                  type="radio"
                                  className="btn-check"
                                  name={elem}
                                  id={`absent-${entryNum}`}
                                  value={false}
                                  checked={!studAttendance[elem]}
                                  onChange={(e) => { handleChange(e, false) }}
                                />
                                <label className="btn btn-outline-sec" htmlFor={`absent-${entryNum}`}>Absent</label>


                              </div>
                            </td>
                          </tr>

                        </>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          )
        )
      }


    </>
  );
}

export default TotalAttendance;