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
import StudentDetails from './student/StudentDetails';

const MainComponent = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginComponent />} />

      {/* Faculty Routes: Start */}
      <Route path="faculty" element={<FacultyMain />} >
        <Route index element={<FacultyHome />} />
        <Route path="profile" element={<FacultyProfile />} />
      </Route>
      {/* Faculty Routes: End */}
      {/* Student Routes: Start*/}
      <Route path="student" element={<StudentMain />}>
        <Route index element={<StudentHome />} />
        <Route path="details" element={<StudentDetails />} />
      </Route>
      {/*Student Routes : End */}

      <Route path="" element={<Navigate to="/login" />} />
    </Routes>
  )
};

export default MainComponent;