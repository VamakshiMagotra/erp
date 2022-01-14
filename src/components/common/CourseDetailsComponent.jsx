import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CourseService from "../../services/CourseService";

import { Loader } from "./Loader";
import { courseSchema } from "../../constants/schema";

const CourseDetailsComponent = () => {
  const { id } = useParams();
  const [dataReady, updateDataReady] = useState(false);
  const [data, updateData] = useState(courseSchema);

  useEffect(() => {
    CourseService.getCourseDetails(id)
      .then((resp) => {
        updateData({ ...resp.data });
        updateDataReady(true);
      })
      .catch((err) => { console.log("Error" + err) });
  }, [id]);

  return (
    <>
      {
        (!dataReady) ? (
          <Loader className="fa-3x" />
        ) : (
          <>
            <div className="card-header bg-custom-sec mb-3 p-4 radius-6">
              <h4 className="mb-0 text-custom-white fw-normal">{data.course.name}</h4>
            </div>
            <div className="course-announce container font-muli">
              <div className="row">
                <div className="col-12 col-md-9">
                  <div className="card">

                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <div className="card shadow-none border-2 radius-6">
                    <div className="card-body text-custom-dark radius-6">
                      <span className="d-block font-1-1x fw-bold mb-3">Upcoming</span>
                      <div className="font-0-75x">
                        No Upcoming Work
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default CourseDetailsComponent;