import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StudentSidebar = () => {

  return (
    <div id="sidebar" className='is-active'>
      <Accordion className='font-roboto'>

        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Link className='text-decoration-none text-custom-dark d-block w-100' to="/warden">
              <i className="fas fa-tachometer-alt me-2" />Dashboard
            </Link>
          </Accordion.Header>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <i className="fas fa-user-tie me-2" />Profile
          </Accordion.Header>
          <Accordion.Body className='bg-custom-light-blue text-custom-blue p-0'>
            <Link className='btn px-3 btn-block d-block text-start shadow-none border-0' to="/warden/profile">
              <i className="fas fa-info-circle me-2" />Details
            </Link>
            <Link className='btn px-3 btn-block d-block text-start shadow-none border-0' to="/warden/password">
              <i className="fas fa-key me-2" />Change Password
            </Link>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <i className="fas fa-door-open me-2" /> Gate Pass
          </Accordion.Header>
          <Accordion.Body className='bg-custom-light-blue text-custom-blue p-0'>
            <Link
              className='btn px-3 btn-block d-block text-start shadow-none border-0'
              to="/warden/pass"
            >
              <i className="fas fa-door-open me-2" /> All
            </Link>
            <Link
              className='btn px-3 btn-block d-block text-start shadow-none border-0'
              to="/warden/search"
            >
              <i className="fas fa-search me-2" /> Search
            </Link>
            <Link
              className='btn px-3 btn-block d-block text-start shadow-none border-0'
              to="/warden/history"
            >
              <i className="fas fa-history me-2" /> History
            </Link>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}

export default StudentSidebar;