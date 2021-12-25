import React, { useState, useEffect } from 'react';
import CourseCardComponent from '../common/CourseCardComponent';

import StudentService from '../../services/StudentService';
import { Loader } from '../common/Loader';

const StudentHome = () => {

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
    if(!courseDetailsAvailable)
      return <Loader className="fa-3x" />;
    
    if(courseDetails.length === 0)
      return <h5>You are not registered in any courses</h5>
    
    return (
      courseDetails.map((course) => (
        <CourseCardComponent key={course.courseId.id} details={course.courseId} />
      ))
    );
  };

  return (
    <>
      <h4 className="text-custom-dark font-mont fw-bold mb-4">My Courses</h4>

      <div className="row">
        {displayCourses()}
      </div>
    </>
  );
}

export default StudentHome;