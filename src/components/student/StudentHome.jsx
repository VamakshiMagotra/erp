import React, { useState, useEffect } from 'react';
import CourseCardComponent from '../common/CourseCardComponent';

import StudentService from '../../services/StudentService';
import TodayTimeline from '../common/TodayTimelineComponent';
import LiveEvents from '../common/LiveEventsComponent';

import { Loader } from '../common/Loader';

const StudentHome = () => {

  // Display course List
  const [courseDetails, updateCourseDetails] = useState([]);
  const [courseDetailsAvailable, updateCourseDetailsAvailable] = useState(false);

  useEffect(() => {
    StudentService.getStudentCourses()
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
      return <h6>You are not registered in any courses</h6>

    return (
      courseDetails.map((course) => (
        <CourseCardComponent key={course.courseId.id} details={course.courseId} urlPrefix="/student" />
      ))
    );
  };

  return (
    <>
      <div className="row">

        {/* Dashboard Center */}
        <div className="col-12 order-2 order-lg-1 col-lg-8 mb-2">
          <div className="card radius-6 p-4 mb-2">
            <h5 className="text-custom-dark font-muli fw-bold mb-2">My Courses</h5>

            <div className="row">
              {displayCourses()}
            </div>
          </div>

          <div className='card radius-6 p-4'>

          </div>
        </div>

        {/* Dashboard side */}
        <div className="col-12 order-1 order-lg-2 col-lg-4 ps-lg-0 mb-2">

          <div className="card radius-6 p-4 mb-2">
            <LiveEvents role="student" />
          </div>

          <div className="card radius-6 p-4">
            <TodayTimeline role="student" />
          </div>
        </div>

      </div>
    </>
  );
}

export default StudentHome;