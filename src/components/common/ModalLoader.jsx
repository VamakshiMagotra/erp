import React from "react";
import { Modal } from "react-bootstrap";

import { Loader } from "./Loader";

const ModalLoader = ({
  show, hideModal
}) => {
  return (
    <Modal
      show={show}
      onHide={hideModal}
      backdrop="static"
      keyboard={false}
      className="loader-modal"
      centered
    >
      <Modal.Body style={{backgroundColor: 'transparent'}}>
        <Loader className="fa-3x text-custom-white" />
      </Modal.Body>
    </Modal>
  );
};

export { ModalLoader };
