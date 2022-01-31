import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import AssignmentService from "../../services/AssignmentService";

import { Loader } from "../common/Loader";

const AssignmentSubmissions = ({ courseId, assignId }) => {

  const [submissions, updateSubmissions] = useState([]);
  const [submissionReady, updateSubmissionReady] = useState(false);
  const [studentObj, updateStudentObj] = useState({});

  useEffect(() => {
    updateSubmissionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSubmissionData = () => {
    AssignmentService.getAllSubmissions(courseId, assignId)
      .then((resp) => {
        updateSubmissions(resp.data);
        updateSubmissionReady(true);
        const aObj = {};
        resp.data.forEach((d) => {
          aObj[d.student.id] = d.marks;
        });
        updateStudentObj(aObj);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  submissions.sort((o1, o2) => {
    const a = o1.student.id;
    const b = o2.student.id;
    if (a === b) {
      return 0;
    }

    if (a > b) {
      return 1;
    }

    return -1;
  });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    updateStudentObj({
      ...studentObj,
      [name]: value,
    });
  };

  const submitMarks = (id, studId) => {
    const marks = studentObj[studId];

    updateSubmissionReady(false);
    AssignmentService.updateMarks(courseId, id, marks)
      .then((resp) => {
        updateSubmissionData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!submissionReady)
    return <Loader className='fa-3x' />;

  if (submissions.length === 0)
    return <h6>No submissions!</h6>;

  return (
    <div className="card radius-6 p-4">
      <h6>Student Submissions</h6>
      <div className="overflow-auto">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Entry No.</th>
              <th>Name</th>
              <th>Submission</th>
              <th>Marked</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {
              submissions.map((sub) => {
                return (
                  <tr key={sub.id}>
                    <td>{sub.student.id}</td>
                    <td className="text-nowrap">{`${sub.student.userId.firstName} ${sub.student.userId.lastName}`}</td>
                    <td>
                      <a
                        href={sub.file}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none"
                      >
                        View <i className="fas fa-external-link-alt ms-2 font-0-85x" />
                      </a>
                    </td>
                    <td>
                      {
                        (sub.marked) ? (
                          <i className="fas fa-check-square text-success" />
                        ) : (
                          <i className="fas fa-times text-danger" />
                        )
                      }
                    </td>
                    <td>
                      <div className="d-flex justify-content-around align-items-center">
                        <Form.Control
                          type="number"
                          className=""
                          name={sub.student.id}
                          value={studentObj[sub.student.id]}
                          style={{ maxWidth: '80px' }}
                          onChange={handleChange}
                        />
                        <button
                          className="btn bg-custom-sec text-custom-white shadow-none"
                          onClick={() => submitMarks(sub.id, sub.student.id)}
                        >
                          Save
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignmentSubmissions;
