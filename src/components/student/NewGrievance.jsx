import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import GrievanceService from "../../services/GrievanceService";
import FileUpload from "../common/FileUploadComponent";

const NewGrievance = ({
  show, hideModal,
}) => {

  const [inputFields, updateInputFields] = useState({
    department: '',
    title: '',
    description: '',
    files: [],
  });

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    updateInputFields({
      ...inputFields,
      [name]: value
    });
  };

  const deleteLink = (index, name) => {
    const linkCopy = [...inputFields[name]];
    linkCopy.splice(index, 1);
    updateInputFields({
      ...inputFields,
      [name]: [...linkCopy],
    });
  };

  const saveFileLink = (fileLink) => {
    updateInputFields({
      ...inputFields,
      files: [...inputFields.files, fileLink],
    })
  };

  const submitGatePass = () => {
    GrievanceService.postStudentGrievance(inputFields)
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
      department: '',
      title: '',
      description: '',
      files: [],
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
          New Grievance
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>

          <Form.Group as={Row} className="mb-3" controlId="title">
            <Form.Label column md="3" className="fw-bold">Department</Form.Label>
            <Col md="9">
              <Form.Select
                name="department"
                onChange={handleChange}
                aria-label="Default select example"
                value={inputFields.department}
              >
                <option>Select Department</option>
                <option value="HOSTEL">Hostel</option>
                <option value="ACADEMICS">Academics</option>
                <option value="OTHER">Others</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="title">
            <Form.Label column md="3" className="fw-bold">Title</Form.Label>
            <Col md="9">
              <Form.Control
                type="text"
                placeholder="Write a Short Title"
                onChange={handleChange}
                name="title"
                value={inputFields.title}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="description">
            <Form.Label column md="3" className="fw-bold">Description</Form.Label>
            <Col md="9">
              <Form.Control
                style={{ resize: 'none' }}
                as="textarea"
                rows={3}
                placeholder="Description"
                onChange={handleChange}
                name="description"
                value={inputFields.description}
              />
            </Col>
          </Form.Group>

          {
            (inputFields.files.length === 0) ? (
              <></>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold mb-0">Files</Form.Label>
                <div className="row">
                  {
                    inputFields.files.map((f, index) => {
                      const i = f.indexOf("%2F");
                      const i2 = f.indexOf("?alt");
                      const sub = f.substring(i + 3, i2);
                      return (
                        <div key={index} className="col-12 col-md-6 d-flex justify-content-between align-items-center">
                          <a
                            href={f}
                            className="text-decoration-none"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {sub}
                          </a>
                          <button className="btn text-danger" onClick={() => deleteLink(index, 'files')}>
                            <i className="fas fa-trash-alt" />
                          </button>
                        </div>
                      );
                    })
                  }
                </div>
              </Form.Group>
            )
          }
          <Form.Group className="mb-3">
            <FileUpload
              className="btn bg-custom-sec text-custom-white shadow-none border-0"
              updateDownloadUrl={saveFileLink}
              defaultName
            >
              <i className="fas fa-plus-circle me-2" />Add File
            </FileUpload>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="bg-custom-sec text-custom-white border-0 shadow-none"
          onClick={submitGatePass}
        >
          Submit Grievance
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

export default NewGrievance;
