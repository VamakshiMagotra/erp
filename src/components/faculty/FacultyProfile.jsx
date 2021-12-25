import React, { useState, useEffect } from "react";
import { getGenderHelper } from '../../helpers/getGenderHelper';
import { toAbsoluteUrl } from "../../helpers/imagePathHelper";
import FacultyService from "../../services/FacultyService";
import FileUpload from "../common/FileUploadComponent";

const FacultyDetailRow = ({
  id, value, disabled, label, plaintext,
}) => {
  return (
    <div className="form-group row mb-2 font-mont">
      <label htmlFor={id} className="col-sm-3 col-form-label fw-bold"> {label} </label>
      <div className="col-sm-8 font-roboto">
        <input
          type="text"
          className={`form-control${(plaintext) ? '-plaintext' : ''} text-center`}
          id="id"
          value={value}
          readOnly={(disabled) ? true : false}
          disabled={(disabled) ? true : false}
        />
      </div>
    </div>
  );
};

const FacultyProfile = () => {

  const [userDetails, updateUserDetails] = useState({
    id: "",
    userId: {
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      phone: "",
      roles: "",
    },
    departmentId: {
      id: "",
      name: "",
      adminDept: false,
    },
    qualification: "",
  });
  const [disabled, updateDisabled] = useState(true);
  const [imageUrl, setImageUrl] = useState(toAbsoluteUrl("male.png"));

  useEffect(() => {
    FacultyService.getFacultyDetails()
      .then((resp) => {
        const { data } = resp;
        updateUserDetails({ ...data });
        //TODO: setImageUrl
      })
      .catch((err) => { console.log(err) });
  }, []);

  const uploadImage = (imageUrl) => {
    //TODO: upload image on server
    setImageUrl(imageUrl);
  };

  return (
    <>
      <div className="card border-0 shadow-none">
        <div className="card-header bg-custom-dark">
          <h4 className="text-custom-grey font-mont fw-bold mb-0">User Profile</h4>
        </div>
        <div className="card-body bg-custom-grey">
          <div className="row mb-3">
            <div className="col-12 col-xl-4 d-flex mb-5 mb-xl-0 flex-column justify-content-center align-items-center">
              <div className="details-image">
                <img src={imageUrl} className="mb-3" alt="profile" draggable="false" />
                {
                  (disabled) ? (
                    <></>
                  ) : (
                    <FileUpload
                      imageOnly
                      className="btn d-block mx-auto bg-custom-blue text-custom-grey"
                      fileName={userDetails.id}
                      updateDownloadUrl={uploadImage}
                    >
                      Upload Profile Picture
                    </FileUpload>
                  )
                }
              </div>
            </div>
            <div className="col-12 col-xl-8 d-flex flex-column j">
              <FacultyDetailRow
                id="Id"
                label="Id"
                disabled={true}
                plaintext={disabled}
                value={userDetails.id}
              />

              <FacultyDetailRow
                id="name"
                label="Full Name"
                disabled={true}
                plaintext={disabled}
                value={userDetails.userId.firstName + " " + userDetails.userId.lastName}
              />

              <FacultyDetailRow
                id="email"
                label="Email Id"
                disabled={true}
                plaintext={disabled}
                value={userDetails.userId.email}
              />

              <FacultyDetailRow
                id="gender"
                label="Gender"
                disabled={true}
                plaintext={disabled}
                value={getGenderHelper(userDetails.userId.gender)}
              />

              <FacultyDetailRow
                id="dib"
                label="Date of Birth"
                disabled={true}
                plaintext={disabled}
                value={userDetails.userId.dob}
              />

              <FacultyDetailRow
                id="phone"
                label="Phone"
                disabled={disabled}
                plaintext={disabled}
                value={userDetails.userId.phone}
              />

              <FacultyDetailRow
                id="department"
                label="Department"
                disabled={true}
                plaintext={disabled}
                value={userDetails.departmentId.name}
              />

              <FacultyDetailRow
                id="qualification"
                label="Qualification"
                disabled={disabled}
                plaintext={disabled}
                value={userDetails.qualification}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {
                (disabled) ? (
                  <button
                    className="btn d-block ms-auto bg-custom-dark text-custom-grey shadow-none"
                    onClick={() => { updateDisabled(!disabled) }}
                  >
                    Update Details
                  </button>
                ) : (
                  <button
                    className="btn d-block ms-auto bg-custom-blue text-custom-grey shadow-none"
                    onClick={() => { updateDisabled(!disabled) }}
                  >
                    Save Details
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyProfile;