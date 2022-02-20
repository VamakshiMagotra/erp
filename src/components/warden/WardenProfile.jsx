import React, { useState, useEffect } from "react";

import FacultyService from "../../services/FacultyService";
import GeneralDetailsComponent from "../common/GeneralDetailsComponent";
import { Loader } from '../common/Loader';

import { facultySchema } from '../../constants/schema';

const WardenProfile = () => {

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

        </div>
      </div>
    </>
  );
};

export default WardenProfile;