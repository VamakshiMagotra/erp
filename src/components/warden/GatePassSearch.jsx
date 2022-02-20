import React, { useState } from 'react';

import HostelService from '../../services/HostelService';

import { ModalLoader } from '../common/ModalLoader';

const GatePassSearch = () => {

  const [entry, updateEntry] = useState("");
  const [error, updateError] = useState("");
  const [showModal, updateShowModal] = useState(false);

  const [gatePasses, updateGatePasses] = useState([]);
  const [passAvailable, updatePassAvailable] = useState(false);
  const [currentNumber, updateCurrentNumber] = useState(0);

  const searchPass = () => {
    updateShowModal(true);
    HostelService.searchGatePass(entry, "false")
      .then((resp) => {
        updateShowModal(false);
        updateError("");
        updatePassAvailable(true);
        updateGatePasses(resp.data);
      })
      .catch((err) => {
        updateError("Invalid Entry Number");
        updateGatePasses([]);
        updatePassAvailable(false);
        updateShowModal(false);
      });
  };

  const signGatePass = (id, allow) => {
    updateShowModal(true);
    HostelService.signFacultyPass(id, allow)
      .then((resp) => {
        updateCurrentNumber(currentNumber + 1);
        updateShowModal(false);
      })
      .catch((er) => {
        console.log(er);
        updateCurrentNumber(currentNumber + 1);
        updateShowModal(false);
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
        (!passAvailable) ? (
          <></>
        ) : (
          <div className="card radius-6 p-4 font-muli">
            <h5 className="mb-4">Sign Gate Pass</h5>

            <p>Number of gate passes left to sign: {gatePasses.length - currentNumber}</p>

            {
              (gatePasses.length === 0 || currentNumber === gatePasses.length) ? (
                <p>No more Gate Passes to sign!</p>
              ) : (
                <div className="border-1-blue radius-6 p-4">
                  <div className="row">
                    <div className='col-12 col-xl-6'>
                      <div className='row'>
                        <h6 className='col-6 fw-bold'>Hostel</h6>
                        <h6 className='col-6 fw-normal'>{gatePasses[currentNumber].hostelReg.room.hostel.name}</h6>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className='col-12 col-xl-6'>
                      <div className='row'>
                        <h6 className='col-6 fw-bold'>Entry Number</h6>
                        <h6 className='col-6 fw-normal'>
                          {gatePasses[currentNumber].hostelReg.student.id}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className='col-12 col-xl-6'>
                      <div className='row'>
                        <h6 className='col-6 fw-bold'>Name</h6>
                        <h6 className='col-6 fw-normal'>
                          {
                            gatePasses[currentNumber].hostelReg.student.userId.firstName
                            + " "
                            + gatePasses[currentNumber].hostelReg.student.userId.lastName
                          }
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className='col-12 col-xl-6'>
                      <div className='row'>
                        <h6 className='col-6 fw-bold'>Phone Number</h6>
                        <h6 className='col-6 fw-normal'>
                          {gatePasses[currentNumber].hostelReg.student.userId.phone}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className='col-12 col-xl-6'>
                      <div className='row'>
                        <h6 className='col-6 fw-bold'>Permanent Address</h6>
                        <h6 className='col-6 fw-normal'>
                          {gatePasses[currentNumber].hostelReg.student.address}<br />
                          {gatePasses[currentNumber].hostelReg.student.city
                            + ", "
                            + gatePasses[currentNumber].hostelReg.student.state}<br />
                          {gatePasses[currentNumber].hostelReg.student.pincode}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className='col-12 col-xl-6'>
                      <div className='row'>
                        <h6 className='col-6 fw-bold'>Purpose</h6>
                        <h6 className='col-6 fw-normal'>
                          {gatePasses[currentNumber].purpose}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className='col-12 col-xl-6'>
                      <div className='row'>
                        <h6 className='col-6 fw-bold'>Date Out</h6>
                        <h6 className='col-6 fw-normal'>
                          {gatePasses[currentNumber].date}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className='col-12 col-xl-6'>
                      <div className='row'>
                        <h6 className='col-6 fw-bold'>Return Date</h6>
                        <h6 className='col-6 fw-normal'>
                          {gatePasses[currentNumber].returnDate}
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className='col-12 col-xl-6'>
                      <div className='row'>
                        <h6 className='col-6 fw-bold d-flex align-items-center'>Permission</h6>
                        <h6 className='col-6'>
                          <button
                            className="btn btn-success"
                            onClick={() => { signGatePass(gatePasses[currentNumber].id, "true") }}
                          >
                            Grant
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => { signGatePass(gatePasses[currentNumber].id, "false") }}
                          >
                            Deny
                          </button>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

          </div>
        )
      }
    </>
  );
};

export default GatePassSearch;