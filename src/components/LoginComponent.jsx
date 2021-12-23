import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toAbsoluteUrl } from '../helpers/imagePathHelper';

import UserService from '../services/UserService';

const LoginComponent = () => {

  const [formValues, updateFormValues] = useState({
    email: '',
    password: '',
  });

  const [errMess, updateErrMess] = useState('');

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    updateFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // On StartUp check if already loggedIn
  useEffect(() => {
    UserService.verifyUser()
      .then((resp) => {
        switch (resp.data.roles) {
          case "ROLE_STUDENT":
            navigate("/student");
            break;
          case "ROLE_FACULTY":
            navigate("/faculty");
            break;
          default:
            navigate("/");
        }
      }).catch((err) => { });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    UserService.loginUser(formValues.email, formValues.password)
      .then((resp) => {
        updateFormValues({
          ...formValues,
          password: '',
        });
        updateErrMess("");

        switch (resp.data.roles) {
          case "ROLE_STUDENT":
            navigate("/student");
            break;
          case "ROLE_FACULTY":
            navigate("/faculty");
            break;
          default:
            navigate("/");
        }
      }).catch((err) => {
        updateFormValues({
          ...formValues,
          password: '',
        });
        updateErrMess('Invalid Email / Password');
      });
  };

  return (
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
                className="flex-shrink-0 bg-custom-dark text-light p-4 z-1 d-flex flex-column justify-content-center align-items-center"
              >
                <img
                  src={toAbsoluteUrl('logo.png')}
                  alt='SMVDU'
                  className='mb-3'
                  draggable="false"
                />
              </div>
              <div className="bg-custom-grey flex-grow-1 z-1 d-flex flex-column justify-content-center align-items-center p-3">
                <h1 className='mb-2 fw-bold'>Sign In</h1>
                <form onSubmit={handleOnSubmit} className="login-details p-3 pt-0">
                  <div className="w-100 text-danger text-center fw-bold mb-1">
                    {errMess}
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
                  <div className="form-group mb-3">
                    <div className='input-group'>
                      <div className="input-group-prepend">
                        <div className="input-group-text h-100">
                          <i className="fas fa-lock-open" />
                        </div>
                      </div>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={formValues.password}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
                  <div className="d-flex mb-3 align-items-center justify-content-end">
                    <div className="ml-auto">
                      <Link to="/" className="forgot-pass">Forgot Password</Link>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-block bg-custom-dark text-custom-grey fw-bold">
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;