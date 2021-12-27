import React from "react";
import { Link } from "react-router-dom";

const CourseCardComponent = ({
  details,
}) => {

  return (
    <div className="col-12 col-lg-6">
      <div className="card mb-3 font-mont">
        <div className="card-header bg-custom-dark text-custom-grey px-5 py-3">
          <h5 className="mb-0">{details.name}</h5>
        </div>
        <div className="card-body bg-custom-grey text-custom-dark px-5 py-3">
          <table className="table table-borderless mb-2">
            <tbody>
              <tr>
                <th>Course Code:</th>
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
            <Link to="/" className="btn d-block bg-custom-dark text-custom-grey">Explore</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardComponent;
