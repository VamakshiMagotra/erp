import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ForgotPasswordService from '../services/ForgotPasswordService';

import { toAbsoluteUrl } from '../helpers/imagePathHelper';
import { ModalLoader } from './common/ModalLoader';

const ForgotPassword = () => {
  const [formValues, updateFormValues] = useState({
    email: '',
    otp: '',
    verifiedOtp: '',
    newPassword: '',
    retype: '',
  });
  const [mess, updateMess] = useState('');
  const [messErr, updateMessErr] = useState(false);
  const [otpRequested, updateOtpRequested] = useState(false);
  const [otpVerified, updateOtpVerified] = useState(false);
  const [passwordChanged, updatePasswordChanged] = useState(false);
  const [showModal, updateShowModal] = useState(false);

  const handleOnChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    updateFormValues({
      ...formValues,
      [name]: value,
    });

    // Check password strength
    if (name === 'newPassword') {
      if (!passRegex.test(value)) {
        updateMess("Must be atleast 6 characters long and contain one number and special character");
        updateMessErr(true);
      } else {
        updateMess("");
        updateMessErr(false);
      }
    }

    if (name === 'retype') {
      if (value !== formValues.newPassword) {
        updateMess("Passwords must match");
        updateMessErr(true);
      } else {
        updateMess("");
        updateMessErr(false);
      }
    }
  };

  // Request Otp
  const requestOtp = (event) => {
    event.preventDefault();
    updateShowModal(true);
    ForgotPasswordService.requestOtp(formValues.email)
      .then((resp) => {
        updateShowModal(false);
        updateMess('Please check your mail');
        updateOtpRequested(true);
        updateOtpVerified(false);
        updateMessErr(false);
        updateFormValues({
          ...formValues,
          otp: '',
          newPassword: '',
          retype: '',
          verifiedOtp: ''
        });
      })
      .catch((err) => {
        updateShowModal(false);
        updateMess(err.response.data.message);
        updateMessErr(true);
      });
  }

  // Verify Otp
  const verifyOtp = (event) => {
    event.preventDefault();
    updateShowModal(true);
    ForgotPasswordService.verifyOtp(formValues.email, formValues.otp)
      .then((resp) => {
        updateShowModal(false);
        updateMess('OTP Verified!');
        updateOtpVerified(true);
        updateMessErr(false);
        updateFormValues({
          ...formValues,
          verifiedOtp: resp.data
        });
      })
      .catch((err) => {
        updateShowModal(false);
        updateMess(err.response.data.message);
        updateMessErr(true);
      });
  };

  //Change Password
  const passRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/g;

  const changePassword = (e) => {
    e.preventDefault();
    updateShowModal(true);
    const data = {
      password: formValues.verifiedOtp,
      newPassword: formValues.newPassword,
      retype: formValues.retype,
    }
    ForgotPasswordService.updatePassword(formValues.email, data)
      .then((resp) => {
        updateShowModal(false);
        updateMess('Password Changed Successfully!');
        updateMessErr(false);
        updatePasswordChanged(true);
      })
      .catch((err) => {
        updateShowModal(false);
        updateMess(err.response.data.message);
        updateMessErr(true);
      });
  }

  const selectRequiredForm = () => {
    if (!otpRequested && !otpVerified && !passwordChanged) {
      return (
        <form onSubmit={requestOtp} className="login-details p-3 pt-0">
          <div className={`w-100 ${(messErr) ? 'text-danger' : 'text-success'} text-center fw-bold mb-1`}>
            {mess}
          </div>
          <div className="form-group mb-1">
            <div className='input-group'>
              <div className="input-group-prepend">
                <div className="input-group-text h-100">
                  <i className="fas fa-at" />
                </div>
              </div>
              <input
                type="text"
                name="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="d-flex mb-3 align-items-center justify-content-end">
            <div className="ml-auto">
              <Link to="/" className="forgot-pass">Sign In</Link>
            </div>
          </div>
          <button type="submit" className="btn btn-block bg-custom-dark text-custom-grey fw-bold">
            Request OTP
          </button>
        </form>
      );
    }
    if (otpRequested && !otpVerified && !passwordChanged) {
      return (
        <form onSubmit={verifyOtp} className="login-details p-3 pt-0">
          <div className={`w-100 ${(messErr) ? 'text-danger' : 'text-success'} text-center fw-bold mb-1`}>
            {mess}
          </div>
          <div className="form-group mb-1">
            <div className='input-group'>
              <div className="input-group-prepend">
                <div className="input-group-text h-100">
                  <i className="fas fa-key" />
                </div>
              </div>
              <input
                type="text"
                name="otp"
                className="form-control"
                id="otp"
                placeholder="Enter OTP"
                value={formValues.otp}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="d-flex mb-0 mt-2 align-items-center justify-content-end">
            <div className="ml-auto">
              <button onClick={requestOtp} className="btn forgot-pass px-0 py-1 shadow-none">Resend OTP</button>
            </div>
          </div>
          <div className="d-flex mb-3 align-items-center justify-content-end">
            <div className="ml-auto">
              <Link to="/" className="forgot-pass">Sign In</Link>
            </div>
          </div>
          <button type="submit" className="btn btn-block bg-custom-dark text-custom-grey fw-bold">
            Verify OTP
          </button>
        </form>
      );
    }

    if (otpRequested && otpVerified && !passwordChanged) {
      return (
        <form onSubmit={changePassword} className="login-details p-3 pt-0">
          <div
            className={`w-100 ${(messErr) ? 'text-danger font-0-75x' : 'text-success fw-bold'} text-center mb-1`}
            style={{ maxWidth: '250px', lineSpacing: '0' }}
          >
            {mess}
          </div>
          <div className="form-group mb-1">
            <div className='input-group'>
              <div className="input-group-prepend">
                <div className="input-group-text h-100">
                  <i className="fas fa-lock-open" />
                </div>
              </div>
              <input
                type="password"
                name="newPassword"
                className="form-control"
                id="newPassword"
                placeholder="Password"
                value={formValues.newPassword}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="form-group mb-1">
            <div className='input-group'>
              <div className="input-group-prepend">
                <div className="input-group-text h-100">
                  <i className="fas fa-lock-open" />
                </div>
              </div>
              <input
                type="password"
                name="retype"
                className="form-control"
                id="retype"
                placeholder="Retype Password"
                value={formValues.retype}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="d-flex mb-0 mt-2 align-items-center justify-content-end">
            <div className="ml-auto">
              <button onClick={requestOtp} className="btn forgot-pass px-0 py-1 shadow-none">Resend OTP</button>
            </div>
          </div>
          <div className="d-flex mb-3 align-items-center justify-content-end">
            <div className="ml-auto">
              <Link to="/" className="forgot-pass">Sign In</Link>
            </div>
          </div>
          <button type="submit" className="btn btn-block bg-custom-dark text-custom-grey fw-bold">
            Change Password
          </button>
        </form>
      );
    }

    return (
      <div>
        <div className={`w-100 ${(messErr) ? 'text-danger' : 'text-success'} mb-3 text-center fw-bold`}>
          {mess}
        </div>
        <Link to="/" className="btn btn-block d-block bg-custom-dark text-custom-grey fw-bold">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <ModalLoader show={showModal} hideModal={() => updateShowModal(false)} />
      <div
        className="login-div"
        style={{
          position: 'relative',
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/back.jpg)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            zIndex: '0',
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(3px)'
          }}
        />
        <div
          className="container height-contain d-flex justify-content-center align-items-center z-1"
        >
          <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <div className='login-complete d-flex border-0 shadow-lg z-1 font-mont'>
                <div
                  className="flex-shrink-0 bg-custom-dark text-light p-4 z-1
                            d-flex flex-column justify-content-center align-items-center"
                >
                  <img
                    src={toAbsoluteUrl('logo.png')}
                    alt='SMVDU'
                    className='mb-3'
                    draggable="false"
                  />
                </div>
                <div className="bg-custom-grey flex-grow-1 z-1 d-flex flex-column justify-content-center align-items-center p-3">
                  <h4 className='mb-2 fw-bold'>Forgot Password</h4>
                  {selectRequiredForm()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
