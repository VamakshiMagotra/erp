import React, { useState, useEffect } from "react";
import CourseCardComponent from "../common/CourseCardComponent";
import FacultyService from '../../services/FacultyService';
import LiveEvents from '../common/LiveEventsComponent';
import TodayTimeline from '../common/TodayTimelineComponent';
import { Loader } from "../common/Loader";

const FacultyHome = () => {

  const [courseDetails, updateCourseDetails] = useState([]);
  const [courseDetailsAvailable, updateCourseDetailsAvailable] = useState(false);

  useEffect(() => {
    FacultyService.getFacultyCourses()
      .then((resp) => {
        updateCourseDetails(resp.data);
        updateCourseDetailsAvailable(true);
      }).catch((err) => {
        updateCourseDetailsAvailable(true);
      });
  }, []);

  const displayCourses = () => {
    if (!courseDetailsAvailable)
      return <Loader className="fa-3x" />;

    if (courseDetails.length === 0)
      return <h5>You are not registered in any courses</h5>

    return (
      courseDetails.map((course) => (
        <CourseCardComponent key={course.id} details={course} urlPrefix="/faculty" />
      ))
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-12 order-2 order-lg-1 col-lg-8 mb-2">
          <div className="card radius-6 p-4">
            <h4 className="text-custom-dark font-mont fw-bold mb-4">My Courses</h4>

            <div className="row">
              {displayCourses()}
            </div>
          </div>
        </div>

        <div className="col-12 order-1 order-lg-2 col-lg-4 ps-lg-0 mb-2">

          <div className="card radius-6 p-4 mb-2">
            <LiveEvents role="faculty" />
          </div>

          <div className="card radius-6 p-4">
            <TodayTimeline role="faculty" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyHome;
