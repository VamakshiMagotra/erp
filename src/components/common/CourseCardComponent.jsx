import React from "react";
import { Link } from "react-router-dom";

const CourseCardComponent = ({
  details, urlPrefix,
}) => {

  return (
    <div className="col-12">
      <div className="card bg-custom-light-blue border-0 flex-lg-row mb-2 radius-6 font-roboto">
        <div
          className="card-header border-0 bg-custom-blue w-lg-40 everything-center radius-lg-6 text-custom-white px-2 px-lg-5"
        >
          <h5 className="mb-0">{details.name}</h5>
        </div>
        <div
          className="card-body bg-custom-light-blue radius-right-lg-6 text-custom-dark px-5 py-3"
          style={{ borderLeft: 'none' }}
        >
          <table className="table table-borderless mb-2">
            <tbody>
              <tr>
                <th>Code:</th>
                <td>{details.id}</td>
              </tr>
              <tr>
                <th>Credits:</th>
                <td>{details.credits}</td>
              </tr>
              <tr>
                <th>L-T-P:</th>
                <td>{`${details.theory}-${details.tutorial}-${details.practical}`}</td>
              </tr>
            </tbody>
          </table>
          <div className="w-100">
            <Link to={`${urlPrefix}/course/${details.id}`} className="btn d-block bg-custom-blue text-custom-white">Explore</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardComponent;
