import React from "react";
import { Outlet } from "react-router-dom";
import DashNavComponent from "../DashNavComponent";
import FacultySidebar from "./FacultySidebar";

const FacultyMain = () => {
  return (
    <div className="dashboard">
      <DashNavComponent parentUrl={"/faculty"} />
      <div className="wrapper">
        <FacultySidebar />

        <div id="content" className="py-3">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyMain;
