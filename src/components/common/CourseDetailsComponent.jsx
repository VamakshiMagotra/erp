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
        updateData({...resp.data});
        updateDataReady(true);
      })
      .catch((err) => {console.log("Error" + err)});
  }, [id]);

  return (
    <>
      {
        (!dataReady) ? (
          <Loader className="fa-3x" />
        ) : (
          <>{data.course.name}</>
        )
      }
    </>
  );
};

export default CourseDetailsComponent;