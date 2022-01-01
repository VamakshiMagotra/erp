import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const CustomFormRow = ({
  id, value, disabled, label, plaintext,
  type, center, onChange,
}) => {
  return (
    <>
      <Form.Group as={Row} className={"mb-2 font-mont"} controlId={id}>
        <Form.Label column sm="6" className={`${(center) ? 'text-center' : ''}`}>{label}</Form.Label>
        <Col sm="6" className="font-roboto">
          <Form.Control
            type={type}
            plaintext={plaintext}
            value={value}
            readOnly={disabled}
            disabled={disabled}
            className={`${(center) ? 'text-center' : ''} fw-bold`}
            name={id}
            onChange={onChange}
          />
        </Col>
      </Form.Group>
    </>
  );
};

export default CustomFormRow;