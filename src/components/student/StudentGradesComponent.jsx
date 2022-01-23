import React, { useState, useEffect } from 'react';

import StudentService from '../../services/StudentService';

import { studentSchema } from '../../constants/schema';
import { Loader } from '../common/Loader';
import { toAbsoluteUrl } from '../../helpers/imagePathHelper';

const StudentGrades = () => {

  const [studentDetails, updateStudentDetails] = useState({ ...studentSchema });
  const [detailsReady, updateDetailsReady] = useState(false);
  const [grades, updateGrades] = useState([]);
  const [gradesReady, updateGradesReady] = useState(false);

  useEffect(() => {
    StudentService.getStudentDetails()
      .then((resp) => {
        updateStudentDetails({ ...resp.data });
        updateDetailsReady(true);
      })
      .catch((err) => { console.log(err) });

    StudentService.getStudentGrades()
      .then((resp) => {
        updateGrades(resp.data);
        updateGradesReady(true);
      })
      .catch((err) => { console.log(err) });
  }, []);

  const formattedGrades = () => {
    const retArr = [];
    for (let i = 1; i <= 10; i++) {
      const semArr = grades.filter((g) => (g.semester === i));
      const obj = {
        sem: i,
        g: semArr
      };
      retArr.push(obj);
    }
    return retArr;
  };

  const SEM_MAP = {
    1: { Year: 1, sem: "ODD" },
    2: { Year: 1, sem: "EVEN" },
    3: { Year: 2, sem: "ODD" },
    4: { Year: 2, sem: "EVEN" },
    5: { Year: 3, sem: "ODD" },
    6: { Year: 3, sem: "EVEN" },
    7: { Year: 4, sem: "ODD" },
    8: { Year: 4, sem: "EVEN" },
  };

  const GRADE_MAP = {
    'A+': 10, 'A': 9,
    'B+': 8, 'B': 7,
    'C+': 6, 'C': 5,
    'D+': 4, 'NP': 0,
  };

  if (!gradesReady || !detailsReady)
    return (<Loader className={'fa-3x'} />);

  return (
    <>
      <div className='card radius-6 p-4 mb-2'>
        <div className="logo font-mont mb-3">
          <img src={toAbsoluteUrl("logo.png")} alt="SMVDU" />
          Shri Mata Vaishno Devi University
        </div>
        <div className='row'>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>Entry Number</h6>
              <h6 className='col-6 fw-normal'>{studentDetails.id}</h6>
            </div>
          </div>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>Name</h6>
              <h6 className='col-6 fw-normal'>{`${studentDetails.userId.firstName} ${studentDetails.userId.lastName}`}</h6>
            </div>
          </div>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>Degree</h6>
              <h6 className='col-6 fw-normal'>{studentDetails.degree.name}</h6>
            </div>
          </div>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>Department</h6>
              <h6 className='col-6 fw-normal'>{studentDetails.departmentId.name}</h6>
            </div>
          </div>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>Semester</h6>
              <h6 className='col-6 fw-normal'>{studentDetails.semester}</h6>
            </div>
          </div>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>CGPA</h6>
              <h6 className='col-6 fw-normal'>{studentDetails.cgpa}</h6>
            </div>
          </div>
        </div>
      </div>
      {
        formattedGrades().map((elem) => {
          const { sem, g } = elem;

          if (g.length === 0) {
            return (<React.Fragment key={sem} />);
          }

          let onlyPass = 0;

          const totalC = g.reduce((p, n, index) => {
            if(n.grade === 'NP') {
              onlyPass += n.course.credits;
            }
            if(index === 1) {
              return p.course.credits + n.course.credits;
            }
            return p + n.course.credits;
          });

          const totGrade = g.reduce((p, n, index) => {
            if(index === 1) {
              return p.course.credits * GRADE_MAP[p.grade] + n.course.credits * GRADE_MAP[n.grade];
            }
            return p + n.course.credits * GRADE_MAP[n.grade];
          });

          return (
            <div key={sem} className='card radius-6 p-4 mb-2'>
              <div className='row mb-4'>
                <div className='col-12 col-md-6'>
                  <div className='row'>
                    <h6 className='col-6'>Year</h6>
                    <h6 className='col-6 fw-normal'>{SEM_MAP[sem].Year}</h6>
                  </div>
                </div>
                <div className='col-12 col-md-6'>
                  <div className='row'>
                    <h6 className='col-6'>Semester</h6>
                    <h6 className='col-6 fw-normal'>{SEM_MAP[sem].sem}</h6>
                  </div>
                </div>
              </div>
              <div className='mb-4 overflow-auto'>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>LTP</th>
                      <th>Credits</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      g.map((gradeElem) => {
                        const { grade, course } = gradeElem;
                        return (
                          <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td className='text-nowrap'>{`${course.theory}-${course.tutorial}-${course.practical}`}</td>
                            <td>{course.credits}</td>
                            <td className='text-nowrap'>{grade}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className='w-md-40'>
                <table className='table table-borderless'>
                  <tbody>
                    <tr>
                      <th>Total Credits Earned</th>
                      <td>{totalC}</td>
                    </tr>
                    <tr>
                      <th>SGPA</th>
                      <td>{(totGrade / (totalC - onlyPass)).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      }
    </>
  );
};

export default StudentGrades;
