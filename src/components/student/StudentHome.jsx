import React from 'react';
import CourseCardComponent from '../common/CourseCardComponent';
import { sampleCourseData } from '../../sample/sampleCourseData';

const StudentHome=()=>{
    return(
        <>
            <h4 className="text-custom-dark font-mont fw-bold mb-4">My Courses</h4>

            <div className="row">
                {
                    sampleCourseData.map((course)=>( 
                        <CourseCardComponent details={course}/>
                    ))
                }
            </div>
        </>
    );
}

export default StudentHome;