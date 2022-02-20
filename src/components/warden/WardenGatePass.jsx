import React, { useState, useEffect } from "react";

import HostelService from "../../services/HostelService";

import { Loader } from "../common/Loader";
import { ModalLoader } from "../common/ModalLoader";

const WardenGatePass = () => {

  const [gatePassData, updateGatePassData] = useState([]);
  const [dataReady, updateDataReady] = useState(false);

  const [currentNumber, updateCurrentNumber] = useState(0);
  const [signing, updateSigning] = useState(false);

  useEffect(() => {
    HostelService.getFacultyPass("warden.trikuta@smvdu.ac.in")
      .then((resp) => {
        updateGatePassData(resp.data);
        updateDataReady(true);
      })
      .catch((err) => {
        updateDataReady(true);
        console.log(err.data);
      });
  }, []);

  const signGatePass = (id, allow) => {
    updateSigning(true);
    HostelService.signFacultyPass(id, allow)
      .then((resp) => {
        updateCurrentNumber(currentNumber + 1);
        updateSigning(false);
      })
      .catch((er) => {
        console.log(er);
        updateCurrentNumber(currentNumber + 1);
        updateSigning(false);
      });
  };

  if (!dataReady)
    return <Loader className="fa-3x" />

  return (
    <>
      <ModalLoader show={signing} hideModal={() => { updateSigning(false) }} />
      <div className="card radius-6 p-4 font-muli">
        <h5 className="mb-4">Sign Gate Pass</h5>

        <p>Number of gate passes left to sign: {gatePassData.length - currentNumber}</p>

        {
          (gatePassData.length === 0 || currentNumber === gatePassData.length) ? (
            <p>No more Gate Passes to sign!</p>
          ) : (
            <div className="border-1-blue radius-6 p-4">
              <div className="row">
                <div className='col-12 col-xl-6'>
                  <div className='row'>
                    <h6 className='col-6 fw-bold'>Hostel</h6>
                    <h6 className='col-6 fw-normal'>{gatePassData[currentNumber].hostelReg.room.hostel.name}</h6>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className='col-12 col-xl-6'>
                  <div className='row'>
                    <h6 className='col-6 fw-bold'>Entry Number</h6>
                    <h6 className='col-6 fw-normal'>
                      {gatePassData[currentNumber].hostelReg.student.id}
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
                        gatePassData[currentNumber].hostelReg.student.userId.firstName
                        + " "
                        + gatePassData[currentNumber].hostelReg.student.userId.lastName
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
                      {gatePassData[currentNumber].hostelReg.student.userId.phone}
                    </h6>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className='col-12 col-xl-6'>
                  <div className='row'>
                    <h6 className='col-6 fw-bold'>Permanent Address</h6>
                    <h6 className='col-6 fw-normal'>
                      {gatePassData[currentNumber].hostelReg.student.address}<br />
                      {gatePassData[currentNumber].hostelReg.student.city
                        + ", "
                        + gatePassData[currentNumber].hostelReg.student.state}<br />
                      {gatePassData[currentNumber].hostelReg.student.pincode}
                    </h6>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className='col-12 col-xl-6'>
                  <div className='row'>
                    <h6 className='col-6 fw-bold'>Purpose</h6>
                    <h6 className='col-6 fw-normal'>
                      {gatePassData[currentNumber].purpose}
                    </h6>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className='col-12 col-xl-6'>
                  <div className='row'>
                    <h6 className='col-6 fw-bold'>Date Out</h6>
                    <h6 className='col-6 fw-normal'>
                      {gatePassData[currentNumber].date}
                    </h6>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className='col-12 col-xl-6'>
                  <div className='row'>
                    <h6 className='col-6 fw-bold'>Return Date</h6>
                    <h6 className='col-6 fw-normal'>
                      {gatePassData[currentNumber].returnDate}
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
                        onClick={() => { signGatePass(gatePassData[currentNumber].id, "true") }}
                      >
                        Grant
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => { signGatePass(gatePassData[currentNumber].id, "false") }}
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
    </>
  );
};

export default WardenGatePass;