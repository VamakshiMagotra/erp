import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import GrievanceService from '../../services/GrievanceService';
import NewGrievance from './NewGrievance';

import { Loader } from '../common/Loader';

const StudentGrievance = () => {

  const [studGrievance, updateStudGrievance] = useState([]);
  const [dataAvailable, updateDataAvailable] = useState(false);

  const [showModal, updateShowModal] = useState(false);

  useEffect(() => {
    getStudentGrievances();
  }, []);

  const getStudentGrievances = () => {
    GrievanceService.getStudentGrievances()
      .then((resp) => {
        updateStudGrievance(resp.data);
        updateDataAvailable(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = (changes) => {
    updateShowModal(false);
    if (changes) {
      updateDataAvailable(false);
      getStudentGrievances();
    }
  };

  if (!dataAvailable)
    return <Loader className="fa-3x" />;

  return (
    <>
      <NewGrievance show={showModal} hideModal={closeModal} />
      <div className="card radius-6 p-4">
        <h5 className='mb-2'>Grievances</h5>
        <div className='w-100 d-flex justify-content-end mb-2'>
          <button className='btn bg-custom-blue text-custom-grey' onClick={() => { updateShowModal(true) }}>
            New Grievance
          </button>
        </div>
        {
          (studGrievance.length === 0) ? (
            <p>No Grievances!</p>
          ) : (
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th></th>
                  <th>Department</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  studGrievance.map((e, index) => {
                    return (
                      <tr key={e.grievance.id}>
                        <td>{index + 1}</td>
                        <td>{e.grievance.department}</td>
                        <td>{e.grievance.title}</td>
                        <td>{e.grievance.datetime.substring(0, 10)}</td>
                        <td>{e.grievance.status}</td>
                        <td>
                          <Link to={`/student/grievance/${e.grievance.id}`}>
                            <i className="fas fa-external-link-alt text-custom-blue" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          )
        }
      </div>
    </>
  );
};

export default StudentGrievance;
