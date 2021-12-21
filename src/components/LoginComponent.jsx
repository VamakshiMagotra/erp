import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../helpers/imagePathHelper';

const LoginComponent = () => {

  const [formValues, updateFormValues] = useState({
    email: '',
    password: '',
  });

  const [errMess, updateErrMess] = useState('');

  const handleOnChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    updateFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    //TODO: Change
    updateErrMess('Invalid Email / Password');
    updateFormValues({
      ...formValues,
      password: '',
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
                      <div class="input-group-prepend">
                        <div class="input-group-text h-100">
                          <i class="fas fa-at" />
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
                      <div class="input-group-prepend">
                        <div class="input-group-text h-100">
                          <i class="fas fa-lock-open" />
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