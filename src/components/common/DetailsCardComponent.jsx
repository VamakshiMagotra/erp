import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button, FormGroup, FormControl, ControlLabel, FloatingLabel } from "react-bootstrap";

const DetailsCardComponent = ({
    details,
}) => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card-header col-8">General Info</div>
                    <div className="card-body">
                        <div className="col-6">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicFName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={details.userId.firstName} readonly/>
                                    
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicLName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={details.userId.lastName} readonly />
                    
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="entryNo">
                                    <Form.Label>Entry Number</Form.Label>
                                    <Form.Control type="text" value={details.userId.entryNo} readonly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email Id</Form.Label>
                                    <Form.Control type="email" value={details.userId.email} readonly />
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                                </Form.Group>

                                
                                <br />
                                <hr />

                            </Form>
                        </div>
                    </div>

                    <div className="card-header col-8">Academic Info</div>
                    <div className="card-body">
                        <div className="col-6">
                            <Form>
                                <Form.Group className="mb-3" controlId="semester">
                                    <Form.Label>Current Semester</Form.Label>
                                    <FloatingLabel controlId="floatingSelect" label="Semester">
                                        <Form.Select aria-label="Floating label select example">

                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="Pass Out">Pass out</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="prog">
                                    <Form.Label>Current Programme</Form.Label>
                                    <FloatingLabel controlId="floatingSelect" label="Programme">
                                        <Form.Select aria-label="Floating label select example">

                                            <option value="cse">B.Tech CSE</option>
                                            <option value="ece">B.Tech ECE</option>
                                            <option value="me">B.Tech ME</option>
                                            <option value="ee">B.Tech EE</option>
                                            <option value="ce">B.Tech CE</option>
                                           
                                        </Form.Select>
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="cgpa">
                                    <Form.Label>Current CGPA</Form.Label>
                                    <Form.Control type="text" value={details.cgpa} readonly />
                                </Form.Group>

                            </Form>
                        </div>
                    </div>

                    
                    <Button className="align-self-center mr-auto" variant="primary" type="submit">
                        Update Info
                    </Button>

                </div>
            </div>
        </>
    );
}

export default DetailsCardComponent;