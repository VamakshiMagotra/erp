import React, { useState, useEffect } from "react";

import HostelService from "../../services/HostelService";

import { Loader } from "../common/Loader";
import { toAbsoluteUrl } from "../../helpers/imagePathHelper";

const WardenHome = () => {

  const [hostelData, updateHostelData] = useState({});
  const [dataReady, updateDataReady] = useState(false);

  useEffect(() => {
    HostelService.getHostelRooms()
      .then((resp) => {
        updateHostelData({ ...resp.data });
        updateDataReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(hostelData);

  if (!dataReady)
    return <Loader className="fa-3x" />

  return (
    <div className="card radius-6 p-4">
      <div className="logo font-mont mb-3">
        <img src={toAbsoluteUrl("logo.png")} alt="SMVDU" />
        Shri Mata Vaishno Devi University
      </div>
      <div className='row'>
        <div className='col-12 col-xl-6'>
          <div className='row'>
            <h6 className='col-6'>Hostel</h6>
            <h6 className='col-6 fw-normal'>{hostelData[0].hostel.name}</h6>
          </div>
        </div>
      </div>
      <div className="row">
        <div className='col-12 col-xl-6'>
          <div className='row'>
            <h6 className='col-6'>Warden</h6>
            <h6 className='col-6 fw-normal'>{hostelData[0].hostel.warden.userId.firstName + " " + hostelData[0].hostel.warden.userId.lastName}</h6>
          </div>
        </div>
        <div className='col-12 col-xl-6'>
          <div className='row'>
            <h6 className='col-6'>Joint Warden</h6>
            <h6 className='col-6 fw-normal'>{hostelData[0].hostel.joint.userId.firstName + " " + hostelData[0].hostel.joint.userId.lastName}</h6>
          </div>
        </div>
      </div>
      <div className="row">
        <div className='col-12 col-xl-6'>
          <div className='row'>
            <h6 className='col-6'>Maximum Occupancy</h6>
            <h6 className='col-6 fw-normal'>
              {hostelData[0].hostel.single + hostelData[0].hostel.doublet * 2 + hostelData[0].hostel.triple * 3}
            </h6>
          </div>
        </div>
      </div>
      <div className="row">
        <div className='col-12 col-xl-6'>
          <div className='row'>
            <h6 className='col-6'>Singlets</h6>
            <h6 className='col-6 fw-normal'>
              {hostelData[0].hostel.single}
            </h6>
          </div>
        </div>
        <div className='col-12 col-xl-6'>
          <div className='row'>
            <h6 className='col-6'>Doublets</h6>
            <h6 className='col-6 fw-normal'>
              {hostelData[0].hostel.doublet}
            </h6>
          </div>
        </div>
      </div>
      <div className="row">
        <div className='col-12 col-xl-6'>
          <div className='row'>
            <h6 className='col-6'>Triplets</h6>
            <h6 className='col-6 fw-normal'>
              {hostelData[0].hostel.triple}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenHome;
