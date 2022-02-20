import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import HostelService from "../../services/HostelService";

const NewGatePass = ({
  show, hideModal, studData, hostelData,
}) => {

  const [inputFields, updateInputFields] = useState({
    purpose: '',
    date: '',
    returnDate: '',
  });

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    updateInputFields({
      ...inputFields,
      [name]: value
    });
  };

  const submitGatePass = () => {
    HostelService.postGatePass(inputFields)
      .then((resp) => {
        closeModal(true);
      })
      .catch((err) => {
        console.log(err);
        closeModal(false);
      });
  }

  const closeModal = (changes) => {
    updateInputFields({
      purpose: '',
      date: '',
      returnDate: '',
    });

    hideModal(changes);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      size="lg"
      show={show}
      aria-labelledby="contained-modal-title-vcenter font-roboto"
      centered
      onHide={() => closeModal(false)}
    >
      <Modal.Header className="bg-custom-sec text-custom-white border-0">
        <Modal.Title id="contained-modal-title-vcenter">
          New Gate Pass
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>

          <Form.Group as={Row} className="mb-3" controlId="name">
            <Form.Label column md="3" className="fw-bold">Name</Form.Label>
            <Col md="9">
              <Form.Control
                type="text"
                placeholder="Name"
                disabled
                readOnly
                name="name"
                value={studData.userId.firstName + " " + studData.userId.lastName}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="hostel">
            <Form.Label column md="3" className="fw-bold">Hostel</Form.Label>
            <Col md="9">
              <Form.Control
                type="text"
                placeholder="Hostel"
                disabled
                readOnly
                name="hostel"
                value={hostelData.room.hostel.name}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="room">
            <Form.Label column md="3" className="fw-bold">Room Number</Form.Label>
            <Col md="9">
              <Form.Control
                type="text"
                placeholder="Room Number"
                disabled
                readOnly
                name="rool"
                value={hostelData.room.block + "-" + hostelData.room.roomNo}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="title">
            <Form.Label column md="3" className="fw-bold">Purpose</Form.Label>
            <Col md="9">
              <Form.Control
                type="text"
                placeholder="Purpose"
                onChange={handleChange}
                name="purpose"
                value={inputFields.purpose}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="title">
            <Form.Label column md="3" className="fw-bold">Going Date</Form.Label>
            <Col md="9">
              <Form.Control
                type="date"
                placeholder="Date"
                onChange={handleChange}
                name="date"
                value={inputFields.date}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="title">
            <Form.Label column md="3" className="fw-bold">Return Date</Form.Label>
            <Col md="9">
              <Form.Control
                type="date"
                placeholder="Return Date"
                onChange={handleChange}
                name="returnDate"
                value={inputFields.returnDate}
              />
            </Col>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="bg-custom-sec text-custom-white border-0 shadow-none"
          onClick={submitGatePass}
        >
          Submit Gate Pass
        </Button>
        <Button
          className="bg-custom-light-blue text-custom-sec border-0 shadow-none"
          onClick={() => closeModal(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewGatePass;
