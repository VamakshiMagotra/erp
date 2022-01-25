import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import CourseService from '../../services/CourseService';
import AttendanceService from '../../services/AttendanceService';

import { courseSchema } from '../../constants/schema';
import { Loader } from '../common/Loader';
import { ModalLoader } from '../common/ModalLoader';

const MarkAttendance = () => {
  const { id } = useParams();
  const location = useLocation();

  const { day, hour, minute } = location.state;

  const [students, updateStudents] = useState([]);
  const [studentAvailalable, updateStudentAvailable] = useState(false);

  const [dataReady, updateDataReady] = useState(false);
  const [data, updateData] = useState(courseSchema);

  const [studentAttendance, updateStudentAttendance] = useState({});

  const [success, updateSuccess] = useState(false);
  const [show, updateShow] = useState(false);

  useEffect(() => {
    CourseService.getCourseDetails(id)
      .then((resp) => {
        updateData({ ...resp.data });
        updateDataReady(true);
      })
      .catch((err) => { console.log("Error" + err) });

    CourseService.getCourseStudents(id)
      .then((resp) => {
        updateStudents(resp.data);
        updateStudentAvailable(true);
        const aObj = {};
        resp.data.forEach((d) => {
          aObj[d.studentModel.id] = false;
        });
        updateStudentAttendance(aObj);
      })
      .catch((err) => { console.log("Error" + err) });
  }, []);

  const postAttendance = () => {
    const date = new Date(day);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let dateToday = date.getDate();
    if (dateToday < 10) {
      dateToday = "0" + dateToday;
    }
    const data = {
      date: `${year}-${month}-${dateToday}`,
      hours: hour,
      minute: minute,
      students: studentAttendance,
    };

    updateShow(true);

    AttendanceService.postFacultyAttendance(id, data)
      .then((resp) => {
        updateSuccess(true);
        updateShow(false);
      })
      .catch((err) => {
        console.log(err);
        updateShow(false);
      });
  };

  const handleChange = (e, checked) => {
    const { name } = e.target;

    updateStudentAttendance({
      ...studentAttendance,
      [name]: checked,
    });
  }

  return (
    <>
      <ModalLoader show={show} hideModal={() => updateShow(false)} />
      <div className="row">
        <div className='col-12'>
          {
            (!studentAvailalable && !dataReady) ? (
              <Loader className={'fa-3x'} />
            ) : (
              <>
                <div className="card-header font-muli bg-custom-sec mb-3 p-4 radius-6">
                  <h4 className="mb-0 text-custom-white fw-normal">{data.course.name}</h4>
                </div>
                <div className='card p-4'>
                  {
                    (!success) ? (
                      <></>
                    ) : (
                      <h6 className='text-success'>Attendance saved successfully!</h6>
                    )
                  }
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
                        students.map((student) => {
                          const studentModel = student.studentModel;
                          return (
                            <tr>
                              <td>{studentModel.id}</td>
                              <td>{studentModel.userId.firstName} {studentModel.userId.lastName}</td>
                              <td>
                                <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                                  <input
                                    type="radio"
                                    class="btn-check"
                                    name={studentModel.id}
                                    id={`present-${studentModel.id}`}
                                    value={true}
                                    checked={studentAttendance[studentModel.id]}
                                    onChange={(e) => handleChange(e, true)}
                                  />
                                  <label class="btn btn-outline-sec" htmlFor={`present-${studentModel.id}`}>Present</label>

                                  <input
                                    type="radio"
                                    class="btn-check"
                                    name={studentModel.id}
                                    id={`absent-${studentModel.id}`}
                                    value={false}
                                    checked={!studentAttendance[studentModel.id]}
                                    onChange={(e) => handleChange(e, false)}
                                  />
                                  <label class="btn btn-outline-sec" htmlFor={`absent-${studentModel.id}`}>Absent</label>


                                </div>
                              </td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                  <div className='w-100 d-flex justify-content-end'>
                    <button className='btn bg-custom-sec text-custom-white' onClick={postAttendance}>
                      Save Attendance
                    </button>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  );
}

export default MarkAttendance;