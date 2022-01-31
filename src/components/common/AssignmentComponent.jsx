import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";

import AssignmentService from "../../services/AssignmentService";
import AssignmentSubmissions from "../faculty/AssignmentSubmissions";
import SubmitAssignment from "../student/SubmitAssignment";

import { Loader } from "./Loader";
import { courseSchema } from "../../constants/schema";

const AssignmentComponent = ({ role }) => {

  const { id, assignId } = useParams();
  const navigate = useNavigate();

  const [assignmentData, updateAssignmentData] = useState({
    id: 0,
    assignment: '',
    description: '',
    course: courseSchema.course,
    due: '',
    due_hours: 0,
    due_minutes: 0,
    time: '',
    max_marks: 0,
  });
  const [dataReady, updateDataReady] = useState(false);

  // Show Modal
  const [show, updateShow] = useState(false);

  useEffect(() => {
    AssignmentService.getOneAssignment(id, assignId)
      .then((resp) => {
        updateAssignmentData({ ...resp.data[0] });
        updateDataReady(true);
      })
      .catch((err) => console.log(err));
  }, [id, assignId]);

  const deleteAssignment = () => {
    AssignmentService.deleteAssignment(id, assignId)
      .then((resp) => {
        navigate(`/${role}/course/${id}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(assignmentData);

  if (!dataReady)
    return <Loader className="fa-3x" />

  return (
    <>
      <Modal show={show} onHide={() => updateShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to delete this assignment ?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={deleteAssignment}>
            Delete
          </button>
          <button className="btn bg-custom-sec text-custom-white" onClick={() => updateShow(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <div className="card-header font-muli bg-custom-sec mb-3 p-4 radius-6">
        <h4 className="mb-0 text-custom-white fw-normal">{assignmentData.course.name}</h4>
      </div>

      <div className="card radius-6 p-4 mb-2">
        <div>
          <h5>Assignment</h5>
          <p>{assignmentData.assignment}</p>
        </div>
        <div className="mb-3">
          <h6>Description</h6>
          {
            assignmentData.description.split("\n").map((e, index) => (
              <p key={index} className="mb-0">{e}</p>
            ))
          }
        </div>
        <div>
          <h6 className="me-3 d-inline-block">Date:</h6>
          <p className="d-inline-block me-3">
            {assignmentData.time.substring(0, 10)}
          </p>
        </div>
        <div>
          <h6 className="me-3 d-inline-block">Due Date:</h6>
          <p className="d-inline-block me-3">
            {assignmentData.due}
          </p>
          <p className="d-inline-block">
            {`${assignmentData.due_hours}:${assignmentData.due_minutes}`}
          </p>
        </div>
        <div>
          <h6 className="mb-0 me-3 d-inline-block">Max Marks:</h6>
          <p className="d-inline-block mb-0">
            {assignmentData.max_marks}
          </p>
        </div>
        {
          (role === 'student') ? (
            <></>
          ) : (
            <div className="d-flex w-100 justify-content-end">
              <button className="btn btn-outline-danger" onClick={() => updateShow(true)}>
                <i className="far fa-trash-alt" /> Delete
              </button>
            </div>
          )
        }
      </div>
      {
        (role === 'student') ? (
          <SubmitAssignment courseId={id} assignId={assignId} />
        ) : (
          <AssignmentSubmissions courseId={id} assignId={assignId} />
        )
      }
    </>
  );
};

export default AssignmentComponent;
