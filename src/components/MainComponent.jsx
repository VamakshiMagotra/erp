import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import LoginComponent from './LoginComponent';

// Faculty Imports
import FacultyMain from './faculty/FacultyMain';
import FacultyHome from './faculty/FacultyHome';
import FacultyProfile from './faculty/FacultyProfile';

// Student Imports
import StudentMain from './student/StudentMain';
import StudentHome from './student/StudentHome';
import StudentProfile from './student/StudentProfile';
import StudentGrades from './student/StudentGradesComponent';

// Common Imports
import CourseDetailsComponent from './common/CourseDetailsComponent';
import TimeTable from './common/TimeTableComponent';
import MarkAttendance from './faculty/MarkAttendance';
import ChangePassword from './common/ChangePasswordComponent';

const MainComponent = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginComponent />} />

      {/* Faculty Routes: Start */}
      <Route path="faculty" element={<FacultyMain />} >
        <Route index element={<FacultyHome />} />
        <Route path="profile" element={<FacultyProfile />} />
        <Route path="course/:id" element={<CourseDetailsComponent role="faculty" />} />
        <Route path="timetable" element={<TimeTable />} />
        <Route path="attendance/:id" element={<MarkAttendance />} />
        <Route path="password" element={<ChangePassword />} />
      </Route>
      {/* Faculty Routes: End */}
      {/* Student Routes: Start*/}
      <Route path="student" element={<StudentMain />}>
        <Route index element={<StudentHome />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="course/:id" element={<CourseDetailsComponent role="student" />} />
        <Route path="timetable" element={<TimeTable />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="password" element={<ChangePassword />} />
      </Route>
      {/*Student Routes : End */}

      <Route path="" element={<Navigate to="/login" />} />
    </Routes>
  )
};

export default MainComponent;