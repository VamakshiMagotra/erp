import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import AssignmentService from "../../services/AssignmentService";

const NewAssignment = ({
  id, show, hideModal
}) => {

  const [inputFields, updateInputFields] = useState({
    assignment: '',
    description: '',
    due: '',
    time: '',
    max_marks: '',
  });

  const [error, updateError] = useState({
    assignment: false,
    description: false,
  });

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    updateInputFields({
      ...inputFields,
      [name]: value
    });
  };

  const addAssignment = () => {
    if (inputFields.assignment === "") {
      updateError({
        ...error,
        assignment: true
      })
    }
    if (inputFields.description === "") {
      updateError({
        ...error,
        description: true
      })
    }
    else {
      const data = {
        assignment: inputFields.assignment,
        description: inputFields.description,
        due: inputFields.due,
        due_hours: parseInt(inputFields.time.substring(0, inputFields.time.indexOf(":"))),
        due_minutes: parseInt(inputFields.time.substring(inputFields.time.indexOf(":") + 1)),
        max_marks: inputFields.max_marks,
      };


      AssignmentService.postNewAssignment(id, data)
        .then((resp) => {
          closeModal(true);
        })
        .catch((err) => {
          console.log(err);
          closeModal(true);
        });
    }
  };

  const closeModal = (changes) => {
    updateInputFields({
      assignment: '',
      description: '',
      links: [],
      files: [],
    });
    updateError({
      assignment: false,
      description: false,
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
          Add New Assignment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label className="fw-bold">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Assignment Title"
              name="assignment"
              value={inputFields.assignment}
              onChange={handleChange}
              isInvalid={error.assignment}
            />
            <Form.Control.Feedback type="invalid">
              Cannot be empty
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="announcement">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              style={{ resize: 'none' }}
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={inputFields.description}
              onChange={handleChange}
              isInvalid={error.description}
            />
            <Form.Control.Feedback type="invalid">
              Cannot be empty
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3" >
            <Col md="6">
              <Form.Group as={Row} controlId="dueDate">
                <Form.Label column md="3" className="fw-bold">Due Date</Form.Label>
                <Col md="9">
                  <Form.Control
                    type="date"
                    placeholder="Due Date"
                    name="due"
                    value={inputFields.due}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>

            <Col md="6">
              <Form.Group as={Row} controlId="dueTime">
                <Form.Label column md="3" className="fw-bold">Due Time</Form.Label>
                <Col md="9">
                  <Form.Control
                    type="time"
                    placeholder="Due Time"
                    name="time"
                    value={inputFields.time}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group as={Row} controlId="maxMarks">
            <Form.Label column md="3" className="fw-bold">Max. Marks</Form.Label>
            <Col md="9">
              <Form.Control
                type="number"
                placeholder="Max Marks"
                name="max_marks"
                value={inputFields.max_marks}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="bg-custom-sec text-custom-white border-0 shadow-none"
          onClick={addAssignment}
        >
          Add Assignment
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

export default NewAssignment;
