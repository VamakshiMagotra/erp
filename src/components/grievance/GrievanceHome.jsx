import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import GrievanceService from "../../services/GrievanceService";

import { Loader } from "../common/Loader";
import { toAbsoluteUrl } from "../../helpers/imagePathHelper";

const GrievanceHome = () => {

  const [notRead, updateNotRead] = useState([]);
  const [read, updateRead] = useState([]);
  const [working, updateWorking] = useState([]);
  const [solved, updateSolved] = useState([]);
  const [dataReady, updateDataReady] = useState(false);

  useEffect(() => {
    GrievanceService.getNotRead()
      .then((res) => {
        updateNotRead(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    GrievanceService.getFacultyGrievance(1)
      .then((res) => {
        updateRead(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    GrievanceService.getFacultyGrievance(2)
      .then((res) => {
        updateWorking(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    GrievanceService.getFacultyGrievance(3)
      .then((res) => {
        updateSolved(res.data);
        updateDataReady(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dataReady)
    return <Loader className="fa-3x" />

  return (
    <>
      <div className="card radius-6 p-4 mb-2">
        <div className="logo font-mont mb-3">
          <img src={toAbsoluteUrl("logo.png")} alt="SMVDU" />
          Shri Mata Vaishno Devi University
        </div>
      </div>
      <div className="card radius-6 p-4 mb-2">
        <h5 className="mb-3">Not Read Grievances</h5>
        {
          (notRead.length === 0) ? (
            <p>No Grievances!</p>
          ) : (
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th></th>
                  <th>Department</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  notRead.map((e, index) => {
                    return (
                      <tr key={e.grievance.id}>
                        <td>{index + 1}</td>
                        <td>{e.grievance.department}</td>
                        <td>{e.grievance.title}</td>
                        <td>{e.grievance.datetime.substring(0, 10)}</td>
                        <td>{e.grievance.status}</td>
                        <td>
                          <Link to={`/grievance/g/${e.grievance.id}`}>
                            <i className="fas fa-external-link-alt text-custom-blue" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          )
        }
      </div>
      <div className="card radius-6 p-4 mb-2">
        <h5 className="mb-3">Read Grievances</h5>
        {
          (read.length === 0) ? (
            <p>No Grievances!</p>
          ) : (
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th></th>
                  <th>Department</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  read.map((e, index) => {
                    return (
                      <tr key={e.grievance.id}>
                        <td>{index + 1}</td>
                        <td>{e.grievance.department}</td>
                        <td>{e.grievance.title}</td>
                        <td>{e.grievance.datetime.substring(0, 10)}</td>
                        <td>{e.grievance.status}</td>
                        <td>
                          <Link to={`/grievance/g/${e.grievance.id}`}>
                            <i className="fas fa-external-link-alt text-custom-blue" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          )
        }
      </div>
      <div className="card radius-6 p-4 mb-2">
        <h5 className="mb-3">Working On Grievances</h5>
        {
          (working.length === 0) ? (
            <p>No Grievances!</p>
          ) : (
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th></th>
                  <th>Department</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  working.map((e, index) => {
                    return (
                      <tr key={e.grievance.id}>
                        <td>{index + 1}</td>
                        <td>{e.grievance.department}</td>
                        <td>{e.grievance.title}</td>
                        <td>{e.grievance.datetime.substring(0, 10)}</td>
                        <td>{e.grievance.status}</td>
                        <td>
                          <Link to={`/grievance/g/${e.grievance.id}`}>
                            <i className="fas fa-external-link-alt text-custom-blue" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          )
        }
      </div>
      <div className="card radius-6 p-4 mb-2">
        <h5 className="mb-3">Solved Grievances</h5>
        {
          (solved.length === 0) ? (
            <p>No Grievances!</p>
          ) : (
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th></th>
                  <th>Department</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  solved.map((e, index) => {
                    return (
                      <tr key={e.grievance.id}>
                        <td>{index + 1}</td>
                        <td>{e.grievance.department}</td>
                        <td>{e.grievance.title}</td>
                        <td>{e.grievance.datetime.substring(0, 10)}</td>
                        <td>{e.grievance.status}</td>
                        <td>
                          <Link to={`/grievance/g/${e.grievance.id}`}>
                            <i className="fas fa-external-link-alt text-custom-blue" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          )
        }
      </div>
    </>
  );
};

export default GrievanceHome;
