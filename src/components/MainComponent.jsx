import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import ForgotPassword from './ForgotPasswordComponent';
import GatePassComponent from './GatePassComponent';

// Faculty Imports
import FacultyMain from './faculty/FacultyMain';
import FacultyHome from './faculty/FacultyHome';
import FacultyProfile from './faculty/FacultyProfile';
import MarkAttendance from './faculty/MarkAttendance';
import TotalAttendance from './faculty/TotalAttendance';

// Student Imports
import StudentMain from './student/StudentMain';
import StudentHome from './student/StudentHome';
import StudentProfile from './student/StudentProfile';
import StudentGrades from './student/StudentGradesComponent';
import StudentGatePass from './student/StudentGatePass';

// Common Imports
import CourseDetailsComponent from './common/CourseDetailsComponent';
import TimeTable from './common/TimeTableComponent';
import ChangePassword from './common/ChangePasswordComponent';
import AssignmentComponent from './common/AssignmentComponent';

const MainComponent = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginComponent />} />
      <Route exact path="/forget" element={<ForgotPassword />} />
      <Route path='/gatepass/:id' element={<GatePassComponent />} />

      {/* Faculty Routes: Start */}
      <Route path="faculty" element={<FacultyMain />} >
        <Route index element={<FacultyHome />} />
        <Route path="profile" element={<FacultyProfile />} />
        <Route path="course/:id">
          <Route index element={<CourseDetailsComponent role="faculty" />} />
          <Route path="attendance" element={<TotalAttendance />} />
          <Route path="assignment/:assignId" element={<AssignmentComponent role="faculty" />} />
        </Route>
        <Route path="timetable" element={<TimeTable />} />
        <Route path="attendance/:id" element={<MarkAttendance />} />
        <Route path="password" element={<ChangePassword />} />
      </Route>
      {/* Faculty Routes: End */}
      {/* Student Routes: Start*/}
      <Route path="student" element={<StudentMain />}>
        <Route index element={<StudentHome />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="course/:id">
          <Route index element={<CourseDetailsComponent role="student" />} />
          <Route path="assignment/:assignId" element={<AssignmentComponent role="student" />} />
        </Route>
        <Route path="timetable" element={<TimeTable />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="password" element={<ChangePassword />} />
        <Route path="pass" element={<StudentGatePass />} />
      </Route>
      {/*Student Routes : End */}

      <Route path="" element={<Navigate to="/login" />} />
    </Routes>
  )
};

export default MainComponent;