import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GrievanceSidebar = () => {

  return (
    <div id="sidebar" className='is-active'>
      <Accordion className='font-roboto'>

        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Link className='text-decoration-none text-custom-dark d-block w-100' to="/grievance">
              <i className="fas fa-tachometer-alt me-2" />Dashboard
            </Link>
          </Accordion.Header>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <i className="fas fa-user-tie me-2" />Profile
          </Accordion.Header>
          <Accordion.Body className='bg-custom-light-blue text-custom-blue p-0'>
            <Link className='btn px-3 btn-block d-block text-start shadow-none border-0' to="/grievance/profile">
              <i className="fas fa-info-circle me-2" />Details
            </Link>
            <Link className='btn px-3 btn-block d-block text-start shadow-none border-0' to="/grievance/password">
              <i className="fas fa-key me-2" />Change Password
            </Link>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}

export default GrievanceSidebar;