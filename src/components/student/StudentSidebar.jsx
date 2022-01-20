import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StudentSidebar = () => {
  return (
    <div id="sidebar" className='is-active'>
      <Accordion className='font-roboto'>

        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <i className="fas fa-user-tie me-2" />Profile
          </Accordion.Header>
          <Accordion.Body className='bg-custom-light-blue text-custom-blue p-0'>
            <Link className='btn px-3 btn-block d-block text-start shadow-none border-0' to="/student/profile">
              <i className="fas fa-info-circle me-2" />Details
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <Link className='text-decoration-none text-custom-dark d-block w-100' to="/student/timetable">
              <i className="fas fa-calendar-alt me-2" />Time Table
            </Link>
          </Accordion.Header>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}

export default StudentSidebar;