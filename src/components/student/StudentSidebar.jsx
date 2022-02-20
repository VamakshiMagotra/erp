import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import StudentService from '../../services/StudentService';

import { Loader } from '../common/Loader';

const StudentSidebar = () => {

  // Display course List
  const [courseDetails, updateCourseDetails] = useState([]);
  const [courseDetailsAvailable, updateCourseDetailsAvailable] = useState(false);

  useEffect(() => {
    StudentService.getStudentCourses()
      .then((resp) => {
        updateCourseDetails(resp.data);
        updateCourseDetailsAvailable(true);
      }).catch((err) => {
        updateCourseDetailsAvailable(true);
      });
  }, []);

  return (
    <div id="sidebar" className='is-active'>
      <Accordion className='font-roboto'>

        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Link className='text-decoration-none text-custom-dark d-block w-100' to="/student">
              <i className="fas fa-tachometer-alt me-2" />Dashboard
            </Link>
          </Accordion.Header>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <i className="fas fa-user-tie me-2" />Profile
          </Accordion.Header>
          <Accordion.Body className='bg-custom-light-blue text-custom-blue p-0'>
            <Link className='btn px-3 btn-block d-block text-start shadow-none border-0' to="/student/profile">
              <i className="fas fa-info-circle me-2" />Details
            </Link>
            <Link className='btn px-3 btn-block d-block text-start shadow-none border-0' to="/student/password">
              <i className="fas fa-key me-2" />Change Password
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <Link className='text-decoration-none text-custom-dark d-block w-100' to="/student/timetable">
              <i className="fas fa-calendar-alt me-2" />Time Table
            </Link>
          </Accordion.Header>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <Link className='text-decoration-none text-custom-dark d-block w-100' to="/student/grades">
              <i className="fas fa-clipboard-list me-2" />Grades
            </Link>
          </Accordion.Header>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <i className="fas fa-book-reader me-2" /> My Courses
          </Accordion.Header>
          <Accordion.Body className='bg-custom-light-blue text-custom-blue p-0'>
            {
              (!courseDetailsAvailable) ? (
                <Loader />
              ) : (
                (courseDetails.length === 0) ? (
                  <span>No Courses</span>
                ) : (
                  courseDetails.map((course) => (
                    <Link
                      key={course.courseId.id}
                      className='btn px-3 btn-block d-block text-start shadow-none border-0'
                      to={`/student/course/${course.courseId.id}`}
                    >
                      <i className="fas fa-bookmark me-2" /> {course.courseId.name}
                    </Link>
                  ))
                )
              )
            }
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <i className="fas fa-home me-2" /> Hostel
          </Accordion.Header>
          <Accordion.Body className='bg-custom-light-blue text-custom-blue p-0'>
            <Link className='btn px-3 btn-block d-block text-start shadow-none border-0' to="/student/pass">
              <i className="fas fa-door-open me-2" />Gate Pass
            </Link>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}

export default StudentSidebar;