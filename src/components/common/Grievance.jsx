import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import GrievanceService from '../../services/GrievanceService';
import { Loader } from './Loader';

const Grievance = ({
  role
}) => {

  const { id } = useParams();
  const [grievanceDetails, updateGrievanceDetails] = useState({});
  const [dataReady, updateDataReady] = useState(false);
  const [reply, updateReply] = useState("");
  const [status, updateStatus] = useState(-1);

  useEffect(() => {
    getGrievanceData(id);
  }, [id]);

  const getGrievanceData = (id) => {
    GrievanceService.getGrievanceDetails(id)
      .then((resp) => {
        updateGrievanceDetails({ ...resp.data });
        updateDataReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStatusUpdate = () => {
    updateDataReady(false);
    GrievanceService.updateStatus(grievanceDetails.grievance.id, status)
      .then((resp) => {
        getGrievanceData(grievanceDetails.grievance.id);
      })
      .catch((err) => {
        console.log(err);
        getGrievanceData(grievanceDetails.grievance.id);
      });
  };

  if (!dataReady)
    return <Loader className="fa-3x" />

  console.log(grievanceDetails);

  return (
    <>
      <div className='card radius-6 p-4 mb-2'>
        <h5 className='mb-4'>Grievance</h5>

        <div className='row'>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>Grievance Number</h6>
              <h6 className='col-6 fw-normal'>{grievanceDetails.grievance.id}</h6>
            </div>
          </div>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>Posted By</h6>
              <h6 className='col-6 fw-normal'>
                {`${grievanceDetails.grievance.student.userId.firstName} ${grievanceDetails.grievance.student.userId.lastName} (${grievanceDetails.grievance.student.id})`}
              </h6>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>Department</h6>
              <h6 className='col-6 fw-normal'>{grievanceDetails.grievance.department}</h6>
            </div>
          </div>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>Status</h6>
              <h6 className='col-6 fw-normal'>
                {grievanceDetails.grievance.status}
              </h6>
            </div>
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-12 col-xl-6'>
            <div className='row'>
              <h6 className='col-6'>Posted On</h6>
              <h6 className='col-6 fw-normal'>
                {grievanceDetails.grievance.datetime.substring(0, 10)}
              </h6>
            </div>
          </div>
        </div>

        <div className='row'>
          <h6 className='col-3'>Title</h6>
          <h6 className='col fw-normal'>{grievanceDetails.grievance.title}</h6>
        </div>

        <div className='row'>
          <h6 className='col-3'>Description</h6>
          <h6 className='col fw-normal'>{grievanceDetails.grievance.description}</h6>
        </div>

        {
          (grievanceDetails.files.length === 0) ? (
            <></>
          ) : (
            <div className='row'>
              <h6 className='col-3'>Files</h6>
              <h6 className='col fw-normal'>
                {
                  grievanceDetails.files.map((elem) => {
                    const fileName = elem.file;
                    const i = fileName.indexOf("%2F");
                    const i2 = fileName.indexOf("?alt");
                    const sub = fileName.substring(i + 3, i2);
                    return (
                      <div key={`file-${elem.id}`} className="mb-1">
                        <a
                          className="border-gray px-2 py-2 radius-6 text-custom-sec bg-custom-light-blue"
                          href={fileName}
                          target={"_blank"}
                          rel="noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          <i className="fas fa-lg fa-file-download me-1" />
                          <span className="font-0-75x">{sub}</span>
                        </a>
                      </div>
                    );
                  })
                }
              </h6>
            </div>
          )
        }
        {
          (role === 'student') ? (
            <></>
          ) : (
            <div className='w-100 d-flex justify-content-end align-items-center mt-3'>
              <h6 className='me-3'>Update Status:</h6>
              <div>
                <select className='form-control' value={status} onChange={(e) => { updateStatus(e.target.value) }}>
                  <option value={-1}>Select Status</option>
                  <option value={1}>READ</option>
                  <option value={2}>WORKING</option>
                  <option value={3}>SOLVED</option>
                </select>
              </div>
              <button
                className='btn bg-custom-blue text-custom-grey'
                onClick={handleStatusUpdate}
                disabled={(status === -1)}
              >
                Update
              </button>
            </div>
          )
        }
      </div>
      <div className='card radius-6 p-4'>
        <h5 className='mb-3'>Reply</h5>
        <textarea
          rows={3}
          className='form-control mb-2'
          value={reply}
          handleChange={(e) => { updateReply(e.target.value) }}
        />
        <div className='w-100 d-flex justify-content-end'>
          <button className='btn bg-custom-blue text-custom-grey'>Reply</button>
        </div>
      </div>
    </>
  );
};

export default Grievance;
