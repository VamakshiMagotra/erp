import React, { useState } from 'react';
import { Form, Col, Row, Modal, Button } from 'react-bootstrap';

import UserService from '../../services/UserService';

const ChangePassword = () => {

  const [passwords, updatePasswords] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passError, updatePassError] = useState({
    newPassword: {
      error: false,
      message: ""
    },
    confirmPassword: {
      error: false,
      message: ""
    }
  });
  const [touched, updateTouched] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [ error, updateError ] = useState({
    err: -1,  // -1 for nothing, 0 for success, 1 for error
    message: "",
  });

  const [showModal, updateShowModal] = useState(false);

  const passRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/g;

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (!touched[name])
      updateTouched({ ...touched, [name]: true });

    updatePasswords({ ...passwords, [name]: value });

    if (name === 'newPassword') {
      if (!passRegex.test(value)) {
        updatePassError({
          ...passError,
          [name]: {
            error: true,
            message: "Must be atleast 6 characters long and contain one number and special character",
          }
        });
      } else {
        updatePassError({
          ...passError,
          [name]: {
            error: false,
            message: "",
          }
        });
      }
    }

    if (name === 'confirmPassword') {
      if (value !== passwords.newPassword) {
        updatePassError({
          ...passError,
          [name]: {
            error: true,
            message: "Passwords must match",
          }
        });
      } else {
        updatePassError({
          ...passError,
          [name]: {
            error: false,
            message: "",
          }
        });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateShowModal(true);
  };

  const handleModalClose = () => {
    updatePasswords({
      password: "",
      newPassword: "",
      confirmPassword: "",
    });

    updatePassError({
      newPassword: {
        error: false,
        message: ""
      },
      confirmPassword: {
        error: false,
        message: ""
      }
    });

    updateTouched({
      newPassword: false,
      confirmPassword: false,
    });

    updateShowModal(false);
  };

  const changePasswordHandler = () => {
    UserService.updatePassword(passwords.newPassword)
      .then((resp) => {
        updateError({
          err: 0,
          message: "Password Changed Successfully",
        });
        updateShowModal(false);
      })
      .catch((err) => {
        updateError({
          err: 1,
          message: err.response.data.message,
        });
        updateShowModal(false);
      });
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => updateShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm password change ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button className="bg-custom-light-blue border-0 text-custom-blue" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button className="bg-custom-blue" onClick={changePasswordHandler}>
            Change Password
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='card radius-6 p-4'>
        <h4 className="text-custom-dark font-mont fw-bold mb-4">Change Password</h4>
        <Form onSubmit={handleSubmit}>
          {
            (error.err === -1) ? (
              <></>
            ) : (
              <h6 className={(error.err === 0) ? 'text-success' : 'text-danger'}>{error.message}</h6>
            )
          }
          <Form.Group as={Row} className="mb-3" controlId="password">
            <Form.Label column md="3">
              Old Password
            </Form.Label>
            <Col md="6" xl="4">
              <Form.Control
                name='password'
                type="password"
                value={passwords.password}
                placeholder="Old Password"
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="new-password">
            <Form.Label column md="3">
              New Password
            </Form.Label>
            <Col md="6" xl="4">
              <Form.Control
                name='newPassword'
                type="password"
                value={passwords.newPassword}
                placeholder="New Password"
                isInvalid={passError.newPassword.error}
                isValid={!passError.newPassword.error && touched.newPassword}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                {passError.newPassword.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="confirm-password">
            <Form.Label column md="3">
              Confirm Password
            </Form.Label>
            <Col md="6" xl="4">
              <Form.Control
                name='confirmPassword'
                type="password"
                placeholder="Confirm Password"
                value={passwords.confirmPassword}
                isInvalid={passError.confirmPassword.error}
                isValid={!passError.confirmPassword.error && touched.confirmPassword}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                {passError.confirmPassword.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="change">
            <Col md="5">
              <button className='btn btn-block d-block bg-custom-blue text-custom-white'>
                Change Password
              </button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;
