import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FacultyService from '../../services/FacultyService';

import { Loader } from '../common/Loader';

const FacultySidebar = () => {
  const [courseDetails, updateCourseDetails] = useState([]);
  const [courseDetailsAvailable, updateCourseDetailsAvailable] = useState(false);

  useEffect(() => {
    FacultyService.getFacultyCourses()
      .then((resp) => {
        updateCourseDetails(resp.data);
        updateCourseDetailsAvailable(true);
      }).catch((err) => {
        updateCourseDetailsAvailable(true);
      });
  }, []);

  return (
    <div id="sidebar" className='is-active'>
      <Accordion className='font-roboto border-1-dark pt-0'>

        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Link className='text-decoration-none text-custom-dark d-block w-100' to="/faculty">
              <i className="fas fa-tachometer-alt me-2" />Dashboard
            </Link>
          </Accordion.Header>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <i className="fas fa-user-tie me-2" />Profile
          </Accordion.Header>
          <Accordion.Body className='bg-custom-light-blue p-0'>
            <Link className='btn px-3 btn-block d-block text-start shadow-none border-0' to="/faculty/profile">
              <i className="fas fa-info-circle me-2" />Details
            </Link>
            <Link className='btn px-3 btn-block d-block text-start shadow-none border-0' to="/faculty/password">
              <i className="fas fa-key me-2" />Change Password
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <Link className='text-decoration-none text-custom-dark d-block w-100' to="/faculty/timetable">
              <i className="fas fa-calendar-alt me-2" />Time Table
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
                      key={course.id}
                      className='btn px-3 btn-block d-block text-start shadow-none border-0'
                      to={`/faculty/course/${course.id}`}
                    >
                      <i className="fas fa-bookmark me-2" /> {course.name}
                    </Link>
                  ))
                )
              )
            }
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>

    </div>
  );
};

export default FacultySidebar;
