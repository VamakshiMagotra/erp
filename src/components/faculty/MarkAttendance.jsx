import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourseService from '../../services/CourseService';
import { courseSchema } from '../../constants/schema';
import { Loader } from '../common/Loader';



const MarkAttendance = () => {
  const { id } = useParams();

  const [students, updateStudents] = useState([]);
  const [studentAvailalable, updateStudentAvailable] = useState(false);

  const [dataReady, updateDataReady] = useState(false);
  const [data, updateData] = useState(courseSchema);

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
      })
      .catch((err) => { console.log("Error" + err) });
  }, []);

  return (
    <>
      <div className="row">
        <div className='col-12'>
          {
            (!studentAvailalable) ? (
              <Loader className={'fa-3x'} />
            ) : (
              <>
                <div className="card-header font-muli bg-custom-sec mb-3 p-4 radius-6">
                  <h4 className="mb-0 text-custom-white fw-normal">{data.course.name}</h4>
                </div>
                <div className='card p-4'>
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
                                    name={`attendance-${studentModel.id}`}
                                    id={`present-${studentModel.id}`}
                                    checked
                                  />
                                  <label class="btn btn-outline-sec" htmlFor={`present-${studentModel.id}`}>Present</label>

                                  <input
                                    type="radio"
                                    class="btn-check"
                                    name={`attendance-${studentModel.id}`}
                                    id={`absent-${studentModel.id}`}
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