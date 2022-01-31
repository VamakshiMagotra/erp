import React, { useState, useEffect } from 'react';

import AssignmentService from '../../services/AssignmentService';
import StudentService from '../../services/StudentService';
import FileUpload from '../common/FileUploadComponent';

import { Loader } from '../common/Loader';
import { ModalLoader } from '../common/ModalLoader';
import { studentSchema } from '../../constants/schema';

const SubmitAssignment = ({ courseId, assignId }) => {

  const [submission, updateSubmission] = useState({});
  const [submissionReady, updateSubmissionReady] = useState(false);
  const [submissionAvailable, updateSubmissionAvailable] = useState(false);
  const [file, updateFile] = useState('');

  const [userDetails, updateUserDetails] = useState({ ...studentSchema });

  const [showModal, updateShowModal] = useState(false);

  useEffect(() => {
    fetchSubmissionDetails();
    StudentService.getStudentDetails()
      .then((resp) => {
        const { data } = resp;
        updateUserDetails({ ...data });
      })
      .catch((err) => {
        console.log(err)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSubmissionDetails = () => {
    AssignmentService.getStudentSubmission(courseId, assignId)
      .then((resp) => {
        updateSubmission({ ...resp.data });
        updateSubmissionReady(true);
        updateSubmissionAvailable(true);
      })
      .catch((err) => {
        console.log(err);
        updateSubmissionReady(true);
        updateSubmissionAvailable(false);
      });
  };

  const submitAssignment = () => {
    updateShowModal(true);
    AssignmentService.postStudentSubmission(courseId, assignId, file)
      .then((resp) => {
        updateSubmission({ ...resp.data });
        updateSubmissionReady(true);
        updateSubmissionAvailable(true);
        updateShowModal(false);
        updateFile("");
      })
      .catch((err) => {
        console.log(err);
        updateSubmissionReady(false);
        updateSubmissionAvailable(false);
        updateShowModal(false);
      });
  };

  const updateAssignment = () => {
    updateShowModal(true);
    AssignmentService.updateStudentSubmission(courseId, submission.id, file)
      .then((resp) => {
        updateSubmission({ ...resp.data });
        updateSubmissionReady(true);
        updateSubmissionAvailable(true);
        updateShowModal(false);
        updateFile("");
      })
      .catch((err) => {
        console.log(err);
        updateSubmissionReady(true);
        updateSubmissionAvailable(true);
        updateShowModal(false);
      });
  };

  let fName;
  if (file !== '') {
    const i = file.indexOf("%2F");
    const i2 = file.indexOf("?alt");
    fName = file.substring(i + 3, i2);
  }

  const renderInfo = () => {
    if (!submissionReady)
      return <Loader className="fa-3x" />
    if (submissionReady && !submissionAvailable) {
      return (
        <>
          <div className='w-md-40 d-flex justify-content-center align-items-center mb-2' style={{ height: '80px' }}>
            <FileUpload
              className='btn btn-block d-block h-100 w-100 bg-custom-light-blue text-custom-sec fw-bold shadow-none border-1-sec'
              updateDownloadUrl={updateFile}
              fileName={`${userDetails.id}_${courseId}_${assignId}_${Date.now()}`}
            >
              Click here to upload file
            </FileUpload>
          </div>
          {
            (file === '') ? (
              <></>
            ) : (
              <div className='d-flex'>
                Selected File:
                <a
                  className='ms-3 text-decoration-none'
                  target="_blank"
                  rel='noreferrer'
                  href={file}
                >
                  {fName}
                </a>
              </div>
            )
          }
          <div className='mt-2'>
            <button
              className='btn bg-custom-sec text-custom-white'
              disabled={(file === '')}
              onClick={submitAssignment}
            >
              Submit Assignment
            </button>
          </div>
        </>
      );
    }
    const fileName = submission.file;
    const i = fileName.indexOf("%2F");
    const i2 = fileName.indexOf("?alt");
    const sub = fileName.substring(i + 3, i2);
    return (
      <>
        <div>
          <div className='d-flex'>
            Submitted File:
            <a
              className='ms-3 text-decoration-none'
              target="_blank"
              rel='noreferrer'
              href={fileName}
            >
              {sub}
            </a>
          </div>
          <div className='mb-3'>
            Marks Obtained: <span className='ms-3'>{submission.marks}</span>
          </div>
        </div>
        <div className='fw-bold'>
          Update Submission
        </div>
        <div className='w-md-40 d-flex justify-content-center align-items-center mb-2' style={{ height: '80px' }}>
          <FileUpload
            className='btn btn-block d-block h-100 w-100 bg-custom-light-blue text-custom-sec fw-bold shadow-none border-1-sec'
            updateDownloadUrl={updateFile}
            fileName={`${userDetails.id}_${courseId}_${assignId}_${Date.now()}`}
          >
            Click here to upload file
          </FileUpload>
        </div>
        {
          (file === '') ? (
            <></>
          ) : (
            <div className='d-flex'>
              Selected File:
              <a
                className='ms-3 text-decoration-none'
                target="_blank"
                rel='noreferrer'
                href={file}
              >
                {fName}
              </a>
            </div>
          )
        }
        <div className='mt-2'>
          <button
            className='btn bg-custom-sec text-custom-white'
            disabled={(file === '')}
            onClick={updateAssignment}
          >
            Submit Assignment
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <ModalLoader show={showModal} hideModal={() => updateShowModal(false)} />
      <div className='card radius-6 p-4'>
        <div>
          <h6>My Submission</h6>
        </div>
        {renderInfo()}
      </div>
    </>
  );
};

export default SubmitAssignment;
