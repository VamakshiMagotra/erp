import React, { useState, useEffect } from "react";

import FacultyService from "../../services/FacultyService";
import CustomFormRow from "../common/CustomFormRow";
import GeneralDetailsComponent from "../common/GeneralDetailsComponent";
import { Loader } from '../common/Loader';

import { facultySchema } from '../../constants/schema';

const FacultyProfile = () => {

  const [userDetails, updateUserDetails] = useState({ ...facultySchema });
  const [detailsReady, setDetailsReady] = useState(false);

  useEffect(() => {
    FacultyService.getFacultyDetails()
      .then((resp) => {
        const { data } = resp;
        updateUserDetails({ ...data });
        setDetailsReady(true);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  if (!detailsReady) {
    return (
      <Loader className="fa-3x" />
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-12">

          <GeneralDetailsComponent
            userId={userDetails.id}
            details={userDetails.userId}
          />

          <div className="card radius-6 p-4 col-12 col-lg-8 offset-lg-2">
            <div className="card-header text-center bg-custom-blue text-custom-white border-0 radius-6 mb-4 font-1-25x">
              Other Details
            </div>
            <div className="card-body">
              <CustomFormRow
                id="department"
                value={userDetails.departmentId.name}
                disabled
                label="Department"
                plaintext
                type="text"
                center
              />

              <CustomFormRow
                id="qualifications"
                value={userDetails.qualification}
                disabled
                label="Qualifications"
                plaintext
                type="text"
                center
              />

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default FacultyProfile;