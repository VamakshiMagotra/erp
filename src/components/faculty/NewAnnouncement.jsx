import React, { useState } from "react";
import { Modal, Button, Form, FormGroup } from "react-bootstrap";

import FileUpload from "../common/FileUploadComponent";

import CourseService from "../../services/CourseService";

const NewAnnouncement = ({
  id, show, hideModal
}) => {

  const [inputFields, updateInputFields] = useState({
    title: '',
    announcement: '',
    links: [],
    files: [],
  });

  const [error, updateError] = useState({
    title: false,
    announcement: false,
    link: false,
  });

  const [link, updateLink] = useState("");
  const [linkField, updateLinkField] = useState(false);

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    if (name === 'link') {
      updateLink(value);
    } else {
      updateInputFields({
        ...inputFields,
        [name]: value
      });
    }
  };

  var urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
  var urlRegex = new RegExp(urlExpression);

  const addLink = () => {
    if (!link.match(urlRegex)) {
      updateError({
        ...error,
        link: true,
      });
    } else {
      updateError({
        ...error,
        link: false,
      });
      updateInputFields({
        ...inputFields,
        links: [...inputFields.links, link]
      });
      updateLinkField(false);
      updateLink("");
    }
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

  const makeAnnouncement = () => {
    if (inputFields.title === "") {
      updateError({
        ...error,
        title: true
      })
    }
    if (inputFields.announcement === "") {
      updateError({
        ...error,
        announcement: true
      })
    }
    else {
      CourseService.postCourseAnnouncements(id, inputFields)
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
      title: '',
      announcement: '',
      links: [],
      files: [],
    });
    updateLink("");
    updateError({
      title: false,
      announcement: false,
      link: false,
    });
    updateLinkField(false);

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
          Announce something to your class
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label className="fw-bold">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Announcement Title"
              name="title"
              value={inputFields.title}
              onChange={handleChange}
              isInvalid={error.title}
            />
            <Form.Control.Feedback type="invalid">
              Cannot be empty
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="announcement">
            <Form.Label className="fw-bold">Announcement</Form.Label>
            <Form.Control
              style={{ resize: 'none' }}
              as="textarea"
              rows={3}
              placeholder="Announcement"
              name="announcement"
              value={inputFields.announcement}
              onChange={handleChange}
              isInvalid={error.announcement}
            />
            <Form.Control.Feedback type="invalid">
              Cannot be empty
            </Form.Control.Feedback>
          </Form.Group>
          {
            (inputFields.links.length === 0) ? (
              <></>
            ) : (
              <FormGroup className="mb-3">
                <Form.Label className="fw-bold mb-0">Links</Form.Label>
                <div className="row">
                  {
                    inputFields.links.map((l, index) => (
                      <div key={index} className="col-12 col-md-6 d-flex justify-content-between align-items-center">
                        <a
                          href={l}
                          className="text-decoration-none"
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {l}
                        </a>
                        <button className="btn text-danger" onClick={() => deleteLink(index, 'links')}>
                          <i className="fas fa-trash-alt" />
                        </button>
                      </div>
                    ))
                  }
                </div>
              </FormGroup>
            )
          }
          <Form.Group className="mb-3">
            <Button
              className="btn bg-custom-sec text-custom-white shadow-none border-0"
              onClick={() => updateLinkField(true)}
              disabled={linkField}
            >
              <i className="fas fa-plus-circle me-2" />Add Link
            </Button>
          </Form.Group>
          {
            (!linkField) ? (
              <></>
            ) : (
              <Form.Group className="mb-3 d-flex">
                <Form.Control
                  placeholder="Link"
                  name="link"
                  value={link}
                  onChange={handleChange}
                  isInvalid={error.link}
                />
                <Button onClick={addLink} className="bg-custom-sec text-custom-white shadow-none">
                  Add
                </Button>
              </Form.Group>
            )
          }
          {
            (inputFields.files.length === 0) ? (
              <></>
            ) : (
              <FormGroup className="mb-3">
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
              </FormGroup>
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
          onClick={makeAnnouncement}
        >
          Announce
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

export default NewAnnouncement;
