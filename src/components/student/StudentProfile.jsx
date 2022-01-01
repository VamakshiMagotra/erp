import React, { useState, useEffect } from "react";

import StudentService from "../../services/StudentService";
import CustomFormRow from "../common/CustomFormRow";
import GeneralDetailsComponent from "../common/GeneralDetailsComponent";
import { Loader } from '../common/Loader';

import { studentSchema } from '../../constants/schema';

const StudentProfile = () => {

  const [userDetails, updateUserDetails] = useState({ ...studentSchema });
  const [detailsReady, setDetailsReady] = useState(false);

  useEffect(() => {
    StudentService.getStudentDetails()
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

          <div className="card-header text-center bg-custom-dark text-custom-grey border-0 radius-6 col-12 col-lg-8 offset-lg-2">
            Academic Details
          </div>
          <div className="card-body col-12 col-lg-8 offset-lg-2">
            <CustomFormRow
              id="degree"
              value={userDetails.degree.name}
              disabled
              label="Degree"
              plaintext
              type="text"
              center
            />

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
              id="semester"
              value={userDetails.semester}
              disabled
              label="Current Semester"
              plaintext
              type="text"
              center
            />

            <CustomFormRow
              id="admission"
              value={userDetails.admissionDate}
              disabled
              label="Date of Admission"
              plaintext
              type="text"
              center
            />

            <CustomFormRow
              id="passing-out"
              value={parseInt(userDetails.admissionDate.slice(0, 4), 10) + userDetails.degree.duration}
              disabled
              label="Year of Passing"
              plaintext
              type="text"
              center
            />

            <CustomFormRow
              id="cgpa"
              value={userDetails.cgpa}
              disabled
              label="CGPA"
              plaintext
              type="text"
              center
            />

          </div>

          <div className="card-header text-center bg-custom-dark text-custom-grey border-0 radius-6 col-12 col-lg-8 offset-lg-2">
            Personal Details
          </div>
          <div className="card-body col-12 col-lg-8 offset-lg-2">
            <CustomFormRow
              id="address"
              value={userDetails.address}
              disabled
              label="Address"
              plaintext
              type="textarea"
              center
            />

            <CustomFormRow
              id="city"
              value={userDetails.city}
              disabled
              label="City"
              plaintext
              type="text"
              center
            />

            <CustomFormRow
              id="state"
              value={userDetails.state}
              disabled
              label="State"
              plaintext
              type="text"
              center
            />

            <CustomFormRow
              id="country"
              value={userDetails.country}
              disabled
              label="Country"
              plaintext
              type="text"
              center
            />

            <CustomFormRow
              id="pincode"
              value={userDetails.pincode}
              disabled
              label="Pincode"
              plaintext
              type="text"
              center
            />

          </div>

        </div>
      </div>
    </>
  );
};

export default StudentProfile;