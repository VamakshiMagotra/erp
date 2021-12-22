import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import LoginComponent from './LoginComponent';

// Faculty Imports
import FacultyMain from './faculty/FacultyMain';
import FacultyHome from './faculty/FacultyHome';
import StudentMain from './student/StudentMain';

const MainComponent = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginComponent />} />

      {/* Faculty Routes: Start */}
      <Route path="faculty" element={<FacultyMain />} >
        <Route index element={<FacultyHome />} />
      </Route>
      {/* Faculty Routes: End */}
      {/* Student Routes: Start*/}
      <Route path="student" element={<StudentMain/>}>

      </Route>
      {/*Student Routes : End */}

      <Route path="" element={<Navigate to="/login" />} />
    </Routes>
  )
};

export default MainComponent;