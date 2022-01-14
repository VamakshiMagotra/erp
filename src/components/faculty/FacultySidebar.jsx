import React from 'react';
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FacultySidebar = () => {
  return (
    <div id="sidebar" className='is-active'>
      <Accordion className='font-roboto'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <i className="fas fa-user-tie me-2" />Profile
          </Accordion.Header>
          <Accordion.Body className='bg-custom-light-blue p-0'>
            <Link className='btn px-3 btn-block d-block text-start text-custom-blue shadow-none border-0' to="/faculty/profile">
              <i className="fas fa-info-circle me-2" />Details
            </Link>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FacultySidebar;
