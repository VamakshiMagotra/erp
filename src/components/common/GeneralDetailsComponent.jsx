import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import CustomFormRow from './CustomFormRow';
import FileUpload from './FileUploadComponent';

import { getGenderHelper } from '../../helpers/getGenderHelper';
import { toAbsoluteUrl } from '../../helpers/imagePathHelper';

import UserService from '../../services/UserService';

const GeneralDetailsComponent = ({
  userId, details,
}) => {

  const [userDetails, updateUserDetails] = useState({ ...details });

  const getImageSrc = (url, gender) => {
    return (url === null) ? (
      (gender === "F") ? toAbsoluteUrl("female.png") : toAbsoluteUrl("male.png")
    ) : (url);
  };

  const [disabled, updateDisabled] = useState(true);
  const [imageUrl, updateImageUrl] = useState(getImageSrc(userDetails.profile, userDetails.gender));
  const [message, updateMessage] = useState({
    type: 'E',
    message: '',
  });

  const onDetailsChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    updateUserDetails({ ...userDetails, [name]: value });
  };

  const changeUserDetails = () => {
    UserService.updateDetails(userDetails.phone, userDetails.profile)
      .then((resp) => {
        updateMessage({
          type: 'S',
          message: "Details Updated Successfully",
        });
        updateDisabled(true);
      })
      .catch((err) => {
        updateMessage({
          type: 'E',
          message: err.response.data.message
        });
      });
  };

  const handleCancel = () => {
    UserService.verifyUser()
      .then((resp) => {
        updateUserDetails({ ...resp.data });
        updateImageUrl(getImageSrc(resp.data.profile, resp.data.gender));
        updateMessage({
          type: 'E',
          message: '',
        });
        updateDisabled(true);
      })
  };

  const uploadImageHelper = (url) => {
    updateUserDetails({ ...details, profile: url });
    updateImageUrl(url);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <div className="card-header text-center bg-custom-dark text-custom-grey border-0 radius-6 col-12 col-lg-8 offset-lg-2">
        General Info
      </div>
      <div className="card-body col-12 col-lg-8 offset-lg-2">
        <div className='d-flex w-100 justify-content-center flex-column align-items-center details-image mb-4'>
          <img src={imageUrl} alt='Profile' draggable={false} />
          {
            (disabled) ? (
              <></>
            ) : (
              <FileUpload
                updateDownloadUrl={uploadImageHelper}
                className="btn mt-3 bg-custom-blue text-custom-grey"
                imageOnly
                fileName={userId + Date.now()}
              >
                Upload Profile Picture
              </FileUpload>
            )
          }
        </div>
        <div className='mb-5'>
          <div className={`text-center ${(message.type === 'E') ? 'text-danger' : 'text-success fw-bold'} mb-3`} >
            {message.message}
          </div>
          <CustomFormRow
            id="id"
            value={userId}
            disabled
            label="ID"
            plaintext={disabled}
            type="text"
            onChange={onDetailsChange}
            center
          />

          <CustomFormRow
            id="full-name"
            value={userDetails.firstName + " " + userDetails.lastName}
            disabled
            label="Full Name"
            plaintext={disabled}
            type="text"
            onChange={onDetailsChange}
            center
          />

          <CustomFormRow
            id="email"
            value={userDetails.email}
            disabled
            label="Email ID"
            plaintext={disabled}
            type="text"
            onChange={onDetailsChange}
            center
          />

          <CustomFormRow
            id="gender"
            value={getGenderHelper(userDetails.gender)}
            disabled
            label="Gender"
            plaintext={disabled}
            type="text"
            onChange={onDetailsChange}
            center
          />

          <CustomFormRow
            id="birth-date"
            value={userDetails.dob}
            disabled
            label="Date of Birth"
            plaintext={disabled}
            type="text"
            onChange={onDetailsChange}
            center
          />

          <CustomFormRow
            id="phone"
            value={userDetails.phone}
            disabled={disabled}
            label="Phone"
            plaintext={disabled}
            type="text"
            onChange={onDetailsChange}
            center
          />

          <CustomFormRow
            id="roles"
            value={capitalizeFirstLetter(userDetails.roles.slice(5).toLowerCase())}
            disabled
            label="Role"
            plaintext={disabled}
            type="text"
            onChange={onDetailsChange}
            center
          />
        </div>

        <div className='w-100 d-flex justify-content-end'>
          {
            (disabled) ? (
              <Button
                className='ms-auto d-block bg-custom-dark text-custom-grey border-0 shadow-none'
                onClick={() => { updateDisabled(false) }}
              >
                Update Details
              </Button>
            ) : (
              <>
                <Button
                  className='d-block bg-custom-blue text-custom-white border-0 shadow-none'
                  onClick={changeUserDetails}
                >
                  Save Details
                </Button>
                <Button
                  className='ms-2 d-block bg-danger text-custom-grey border-0 shadow-none'
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            )
          }
        </div>
      </div>
    </>
  );
};

export default GeneralDetailsComponent;
