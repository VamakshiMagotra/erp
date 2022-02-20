import React, { useState, useEffect } from "react";
import QRCode from 'qrcode.react';
import { useParams } from "react-router-dom";

import HostelService from "../services/HostelService";

import { Loader } from "./common/Loader";

const GatePassComponent = () => {

  const { id } = useParams();

  const [passDetails, updatePassDetails] = useState({});
  const [passDetailsAvailable, updatePassDetailsAvailable] = useState(false);

  useEffect(() => {
    HostelService.getGatePass(id)
      .then((resp) => {
        updatePassDetails({ ...resp.data });
        updatePassDetailsAvailable(true);
      })
      .catch((err) => {
        console.log(err);
        updatePassDetailsAvailable(false);
      });
  }, [id]);

  console.log(passDetails);

  if (!passDetailsAvailable) {
    return (
      <div className="height-contain w-100 d-flex justify-content-center align-items-center">
        <Loader className="fa-3x" />
      </div>
    );
  }

  return (
    <div className="height-contain container font-roboto d-flex justify-content-center align-items-center">
      <div className="w-md-50 mx-auto border-1-dark radius-4 p-4">
        <h3 className="text-center mb-4">GATE PASS</h3>
        <div className="d-flex align-items-center justify-content-center mb-4">
          <QRCode value={`http://localhost:3000/gatepass/${id}`} />
        </div>
        <div className="row">
          <div className="col fw-bold text-center">
            Entry No.
          </div>
          <div className="col text-center">
            {passDetails.hostelReg.student.id}
          </div>
        </div>
        <div className="row">
          <div className="col fw-bold text-center">
            Name
          </div>
          <div className="col text-center">
            {passDetails.hostelReg.student.userId.firstName + " " + passDetails.hostelReg.student.userId.lastName}
          </div>
        </div>
        <div className="row">
          <div className="col fw-bold text-center">
            Phone No.
          </div>
          <div className="col text-center">
            {passDetails.hostelReg.student.userId.phone}
          </div>
        </div>
        <div className="row">
          <div className="col fw-bold text-center">
            Permanent Address
          </div>
          <div className="col text-center">
            {passDetails.hostelReg.student.address}<br />
            {passDetails.hostelReg.student.city + ", " + passDetails.hostelReg.student.state}<br />
            {passDetails.hostelReg.student.pincode}
          </div>
        </div>
        <div className="row">
          <div className="col fw-bold text-center">
            Purpose
          </div>
          <div className="col text-center">
            {passDetails.purpose}
          </div>
        </div>
        <div className="row">
          <div className="col fw-bold text-center">
            Date Out
          </div>
          <div className="col text-center">
            {passDetails.date}
          </div>
        </div>
        <div className="row">
          <div className="col fw-bold text-center">
            Return Date
          </div>
          <div className="col text-center">
            {passDetails.returnDate}
          </div>
        </div>
        <div className="row">
          <div className="col fw-bold text-center">
            Signed By
          </div>
          <div className="col text-center">
            {`Mr. ${passDetails.signedBy.userId.firstName} ${passDetails.signedBy.userId.lastName}`}
          </div>
        </div>
        <div className="row">
          <div className="col fw-bold text-center">
            Signed On
          </div>
          <div className="col text-center">
            {passDetails.signedOn.substring(0, 10)}
          </div>
        </div>
        <div className="row mb-4">
          <div className="col fw-bold text-center">
            Permission
          </div>
          <div className={`col text-center fw-bolder ${(passDetails.permission) ? 'text-success' : 'text-danger'}`}>
            {
              (passDetails.permission) ? (
                'GRANTED'
              ) : (
                'NOT GRANTED'
              )
            }
          </div>
        </div>
        <div className="row">
          <div className="w-100">
            <button
              className="btn btn-block d-block bg-custom-blue text-custom-grey ms-auto"
              onClick={() => {window.print()}}
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatePassComponent;
