import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import FacultyService from '../../services/FacultyService';
import HostelService from '../../services/HostelService';

import { ModalLoader } from '../common/ModalLoader';
import { studentSchema } from '../../constants/schema';

const GatePassHistory = () => {

  const [entry, updateEntry] = useState("");
  const [error, updateError] = useState("");
  const [showModal, updateShowModal] = useState(false);

  const [gatePasses, updateGatePasses] = useState([]);
  const [passAvailable, updatePassAvailable] = useState(false);
  const [studentDetails, updateStudentDetails] = useState({ ...studentSchema });
  const [detailAvailable, updateDetailAvailable] = useState(false);

  const searchPass = () => {
    updateShowModal(true);
    HostelService.searchGatePass(entry, "true")
      .then((resp) => {
        updateShowModal(false);
        updateError("");
        updatePassAvailable(true);
        updateGatePasses(resp.data.reverse());
      })
      .catch((err) => {
        updateError("Invalid Entry Number");
        updateGatePasses([]);
        updatePassAvailable(false);
        updateShowModal(false);
        updateStudentDetails({ ...studentSchema });
        updateDetailAvailable(false);
      });

    FacultyService.getStudentDetails(entry)
      .then((resp) => {
        updateStudentDetails({ ...resp.data });
        updateDetailAvailable(true);
      })
      .catch((err) => {
        updateError("Invalid Entry Number");
        updateGatePasses([]);
        updatePassAvailable(false);
        updateShowModal(false);
        updateStudentDetails({ ...studentSchema });
        updateDetailAvailable(false);
      });
  };

  return (
    <>
      <ModalLoader show={showModal} hideModal={() => { updateShowModal(false) }} />
      <div className='card radius-6 p-4 mb-2'>
        <h5 className='mb-4'>Search Student</h5>

        <div className='d-flex col-12 col-xl-6 mb-2'>
          <input
            className='form-control'
            type="text"
            value={entry}
            onChange={(e) => { updateEntry(e.target.value) }}
            placeholder="Entry Number"
            name="entry"
          />
          <button className='btn bg-custom-blue text-custom-grey' onClick={searchPass}>
            <i className='fas fa-search' />
          </button>
        </div>
        <div className='text-danger'>{error}</div>

      </div>
      {
        (!passAvailable || !detailAvailable) ? (
          <></>
        ) : (
          <div className='card radius-6 p-4'>
            <div className='row'>
              <div className='col-12 col-xl-6'>
                <div className='row'>
                  <h6 className='col-6'>Entry Number</h6>
                  <h6 className='col-6 fw-normal'>
                    {studentDetails.id}
                  </h6>
                </div>
              </div>
            </div>
            <div className="row">
              <div className='col-12 col-xl-6'>
                <div className='row'>
                  <h6 className='col-6'>Name</h6>
                  <h6 className='col-6 fw-normal'>
                    {studentDetails.userId.firstName + " " + studentDetails.userId.lastName}
                  </h6>
                </div>
              </div>
            </div>
            <div className="row">
              <div className='col-12 col-xl-6'>
                <div className='row'>
                  <h6 className='col-6'>Degree</h6>
                  <h6 className='col-6 fw-normal'>
                    {studentDetails.degree.name}
                  </h6>
                </div>
              </div>
              <div className='col-12 col-xl-6'>
                <div className='row'>
                  <h6 className='col-6'>Department</h6>
                  <h6 className='col-6 fw-normal'>
                    {studentDetails.departmentId.name}
                  </h6>
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className='col-12 col-xl-6'>
                <div className='row'>
                  <h6 className='col-6'>Semester</h6>
                  <h6 className='col-6 fw-normal'>
                    {studentDetails.semester}
                  </h6>
                </div>
              </div>
              <div className='col-12 col-xl-6'>
                <div className='row'>
                  <h6 className='col-6'>Phone Number</h6>
                  <h6 className='col-6 fw-normal'>
                    {studentDetails.userId.phone}
                  </h6>
                </div>
              </div>
            </div>
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
                  gatePasses.map((pass, index) => (
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
      }
    </>
  );
};

export default GatePassHistory;
