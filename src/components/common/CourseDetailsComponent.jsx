import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";

import CourseService from "../../services/CourseService";
import NewAnnouncement from "../faculty/NewAnnouncement";
import CourseAnnoucements from "./CourseAnnoucements";
import NewAssignment from "../faculty/NewAssignment";
import AssignmentService from "../../services/AssignmentService";

import { Loader } from "./Loader";
import { courseSchema } from "../../constants/schema";

const CourseDetailsComponent = ({ role }) => {
  const { id } = useParams();
  const [dataReady, updateDataReady] = useState(false);
  const [data, updateData] = useState(courseSchema);
  const [assignmentData, updateAssignmentData] = useState([]);
  const [upcoming, updateUpcoming] = useState([]);

  const [students, updateStudents] = useState([]);

  // For post new announcement Modal
  const [showModal, updateShowModal] = useState(false);
  // For post new assignment Modal
  const [assignModal, updateAssignModal] = useState(false);

  useEffect(() => {

    fetchCourseDetails(id);
    fetchAssignments(id);
    fetchUpcomingAssignments(id);

    CourseService.getCourseStudents(id)
      .then((resp) => {
        updateStudents(resp.data);
      })
      .catch((err) => { console.log("Error" + err) });
  }, [id]);

  // Get Course Details
  const fetchCourseDetails = (course_id) => {
    CourseService.getCourseDetails(course_id)
      .then((resp) => {
        updateData({ ...resp.data });
        updateDataReady(true);
      })
      .catch((err) => { console.log("Error" + err) });
  };

  // Get Course Assignments
  const fetchAssignments = (course_id) => {
    AssignmentService.getAllAssignments(course_id)
      .then((resp) => {
        updateAssignmentData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get Upcoming Assignments
  const fetchUpcomingAssignments = (course_id) => {
    AssignmentService.getUpcomingAssignments(course_id)
      .then((resp) => {
        updateUpcoming(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(assignmentData);

  const closeModal = (changes) => {
    updateShowModal(false);
    if (changes) {
      updateDataReady(false);
      fetchCourseDetails(id);
    }
  };

  return (
    <>
      {
        (!dataReady) ? (
          <Loader className="fa-3x" />
        ) : (
          <>
            {
              (role === "student") ? (
                <></>
              ) : (
                <>
                  <NewAnnouncement
                    id={id}
                    show={showModal}
                    hideModal={closeModal}
                  />
                  <NewAssignment
                    id={id}
                    show={assignModal}
                    hideModal={() => updateAssignModal(false)}
                  />
                </>
              )
            }
            <div className="card-header font-muli bg-custom-sec mb-3 p-4 radius-6">
              <h4 className="mb-0 text-custom-white fw-normal">{data.course.name}</h4>
            </div>
            <div className="course-announce container font-muli">
              <div className="row">
                <div className="col-12 col-md-9">

                  <Accordion>
                    <Accordion.Item eventKey="0" className="border-0 shadow-none">
                      <Accordion.Header className="p-0">
                        <div className="mb-0 w-100 py-0">
                          <div className="card-body radius-6">
                            <h5 className="fw-bold mb-0">Announcements</h5>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="bg-custom-light p-0 pt-2 border-0 shadow-none">
                        {
                          (role === 'student') ? (
                            <></>
                          ) : (
                            <div className="w-100 d-flex justify-content-end">
                              <button
                                className="mb-2 btn bg-custom-sec text-custom-white shadow-none"
                                onClick={() => updateShowModal(true)}
                              >
                                New Announcement
                              </button>
                            </div>
                          )
                        }
                        <CourseAnnoucements
                          courseId={id}
                          role={role}
                          data={data}
                          onDelete={() => {
                            updateDataReady(false);
                            fetchCourseDetails(id);
                          }}
                        />
                      </Accordion.Body>
                    </Accordion.Item>

                    {/* Assignments */}
                    <Accordion.Item eventKey="1" className="border-0 shadow-none mt-2">
                      <Accordion.Header className="p-0">
                        <div className="mb-0 w-100 py-0">
                          <div className="card-body radius-6">
                            <h5 className="fw-bold mb-0">Assignments</h5>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="bg-custom-light p-0 pt-2 border-0 shadow-none">
                        {
                          (role === 'student') ? (
                            <></>
                          ) : (
                            <div className="w-100 d-flex justify-content-end">
                              <button
                                className="mb-2 btn bg-custom-sec text-custom-white shadow-none"
                                onClick={() => updateAssignModal(true)}
                              >
                                New Assignment
                              </button>
                            </div>
                          )
                        }
                        {
                          (assignmentData.length === 0) ? (
                            <></>
                          ) : (
                            <div className="card radius-6 font-roboto w-100 p-3">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Assignment</th>
                                    <th>Due Date</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    assignmentData.map((assign) => {
                                      console.log(assign);
                                      return (
                                        <tr>
                                          <td>{assign.assignment}</td>
                                          <td>{assign.due}</td>
                                          <td>
                                            <Link
                                              to={`/${role}/course/${id}/assignment/${assign.id}`}
                                              className="text-decoration-none text-custom-sec"
                                            >
                                              <i className="fas fa-info-circle font-1-5x" />
                                            </Link>
                                          </td>
                                        </tr>
                                      );
                                    })
                                  }
                                </tbody>
                              </table>
                            </div>
                          )
                        }
                      </Accordion.Body>
                    </Accordion.Item>

                    {/* Student List */}
                    {
                      (role === 'student') ? (
                        <></>
                      ) : (
                        <Accordion.Item eventKey="2" className="border-0 shadow-none mt-2">
                          <Accordion.Header className="p-0">
                            <div className="mb-0 w-100 py-0">
                              <div className="card-body radius-6">
                                <h5 className="fw-bold mb-0">Students Attendance</h5>
                              </div>
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="bg-custom-light p-0 pt-2 border-0 shadow-none">
                            <div className="w-100 d-flex justify-content-end">
                              <Link
                                className="mb-2 btn bg-custom-sec text-custom-white shadow-none"
                                to={`/faculty/course/${id}/attendance`}
                              >
                                Total Attendance
                              </Link>
                            </div>

                            <div className="card radius-6 font-roboto w-100 p-3">

                              <table className="table table-bordered">
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
                                      const { present, absent } = student;
                                      const total = present + absent;
                                      const attendance = present / total * 100;
                                      return (
                                        <tr key={studentModel.id}>
                                          <td>{studentModel.id}</td>
                                          <td>{studentModel.userId.firstName} {studentModel.userId.lastName}</td>
                                          <td>{attendance.toFixed(2)}%</td>
                                        </tr>
                                      )

                                    })

                                  }
                                </tbody>
                              </table>
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                    }

                    {/* Syllabus */}
                    <Accordion.Item eventKey="3" className="border-0 shadow-none mt-2">
                      <Accordion.Header className="p-0">
                        <div className="mb-0 w-100 py-0">
                          <div className="card-body radius-6">
                            <h5 className="fw-bold mb-0">Syllabus</h5>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="bg-custom-light p-0 pt-2 border-0 shadow-none d-flex justify-content-between">
                        <div>
                          <img src={data.course.syllabus} className="w-100" alt="Syllabus" />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                </div>


                <div className="col-12 col-md-3 ">
                  {
                    (role === 'student') ? (
                      <></>
                    ) : (
                      <div className="card shadow-none border-2 radius-6 mb-2">
                        <div className="card-body text-custom-dark radius-6">
                          <span className="d-block font-1-1x fw-bold mb-3">Quick Links</span>
                          <div className="font-roboto d-flex flex-column align-items-start">
                            <button
                              className="btn mb-2 shadow-none p-0 font-0-85x text-custom-sec"
                              onClick={() => updateShowModal(true)}
                            >
                              New Announcement
                            </button>
                            <button
                              className="btn mb-2 shadow-none p-0 font-0-85x text-custom-sec"
                              onClick={() => updateAssignModal(true)}
                            >
                              New Assignment
                            </button>
                            {
                              (role === 'student') ? (
                                <></>
                              ) : (
                                <Link
                                  className="btn mb-2 shadow-none p-0 font-0-85x text-custom-sec"
                                  to={`/faculty/course/${id}/attendance`}
                                >
                                  View Attendance
                                </Link>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    )
                  }
                  <div className="card shadow-none border-2 radius-6">
                    <div className="card-body text-custom-dark radius-6">
                      <span className="d-block font-1-1x fw-bold mb-3">Upcoming</span>
                      {
                        (upcoming.length === 0) ? (
                          <div className="font-0-75x">
                            No Upcoming Work
                          </div>
                        ) : (
                          <div>
                            {
                              upcoming.map((assign) => {
                                return (
                                  <div className="d-flex flex-column mb-3">
                                    <Link
                                      className="mb-0 text-decoration-none font-0-85x"
                                      to={`${role}/course/${id}/assignment/${assign.id}`}
                                    >
                                      {assign.assignment}
                                    </Link>
                                    <label className=" font-0-65x">{assign.due}</label>
                                  </div>
                                );
                              })
                            }
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default CourseDetailsComponent;