import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import StudentService from '../../services/StudentService';
import HostelService from '../../services/HostelService';
import NewGatePass from './NewGatePass';

import { studentSchema } from '../../constants/schema';
import { toAbsoluteUrl } from '../../helpers/imagePathHelper';
import { Loader } from '../common/Loader';

const StudentGatePass = () => {

  const [studentDetails, updateStudentDetails] = useState({ ...studentSchema });
  const [detailsReady, updateDetailsReady] = useState(false);
  const [studentHostel, updateStudentHostel] = useState({});
  const [hostelDetailsReady, updateHostelDetailsReady] = useState(false);

  const [upcomingGatePass, updateUpcomingGatePass] = useState([]);
  const [passesReady, updatePassesReady] = useState(false);

  const [showModal, updateShowModal] = useState(false);

  useEffect(() => {
    StudentService.getStudentDetails()
      .then((resp) => {
        updateStudentDetails({ ...resp.data });
        updateDetailsReady(true);
      })
      .catch((err) => { console.log(err) });

    HostelService.getStudentHostelDetails()
      .then((resp) => {
        updateStudentHostel({ ...resp.data });
        updateHostelDetailsReady(true);
      })
      .catch((err) => { console.log(err) });

    getUpcomingPassDetails();
  }, []);

  const getUpcomingPassDetails = () => {
    HostelService.getStudentUpcomingGatePass()
      .then((resp) => {
        updateUpcomingGatePass(resp.data);
        updatePassesReady(true);
      })
      .catch((err) => { console.log(err) });
  };

  const closeModal = (changes) => {
    updateShowModal(false);
    if (changes) {
      updatePassesReady(false);
      getUpcomingPassDetails();
    }
  };

  console.log(upcomingGatePass);

  if (!hostelDetailsReady || !detailsReady)
    return (<Loader className={'fa-3x'} />);

  return (
    <>
      <NewGatePass show={showModal} hideModal={closeModal} studData={studentDetails} hostelData={studentHostel} />
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
              <h6 className='col-6'>Hostel</h6>
              <h6 className='col-6 fw-normal'>{studentHostel.room.hostel.name}</h6>
            </div>
          </div>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>Room Number</h6>
              <h6 className='col-6 fw-normal'>{studentHostel.room.block + "-" + studentHostel.room.roomNo}</h6>
            </div>
          </div>
        </div>
      </div>
      <div className='card p-4 radius-6'>
        <h5 className="text-custom-dark font-muli fw-bold mb-3">My Gate Pass</h5>
        <div className='mb-2 w-100 d-flex justify-content-end'>
          <button
            className="mb-2 btn bg-custom-sec text-custom-white shadow-none"
            onClick={() => updateShowModal(true)}
          >
            New Gate Pass
          </button>
        </div>
        {
          (!passesReady) ? (
            <Loader className="fa-2x" />
          ) : (
            (upcomingGatePass.length === 0) ? (
              <h6>No Gate Pass!</h6>
            ) : (
              <div>
                <table className='table table-bordered'>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Purpose</th>
                      <th>Date</th>
                      <th>Return Date</th>
                      <th>Permission</th>
                      <th>Signed On</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      upcomingGatePass.map((pass, index) => (
                        <tr key={pass.id}>
                          <td>{index + 1}</td>
                          <td>{pass.purpose}</td>
                          <td>{pass.date}</td>
                          <td>{pass.returnDate}</td>
                          <td>
                            {
                              (pass.permission) ? (
                                <i className="fas fa-check-square text-success" />
                              ) : (
                                <i className="fas fa-times text-danger" />
                              )
                            }
                          </td>
                          <td>
                            {
                              (pass.signedOn === null) ? (
                                "NA"
                              ) : (
                                pass.signedOn.substring(0, 10)
                              )
                            }
                          </td>
                          <td>
                            {
                              (pass.signedOn === null) ? (
                                "NA"
                              ) : (
                                <Link to={`/gatepass/${pass.id}`}>
                                  <i className="fas fa-external-link-alt text-custom-blue" />
                                </Link>
                              )
                            }
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )
          )
        }
      </div>
    </>
  );
};

export default StudentGatePass;
