import React from "react";
import { Outlet } from "react-router-dom";
import DashNavComponent from "../DashNavComponent";
import StudentSidebar from "./StudentSidebar";

const StudentMain = () => {
  return (
    <div className="dashboard">
      <DashNavComponent parentUrl={'/student'} />
      <div className="wrapper">
        <StudentSidebar />

        <div id="content" className="py-3">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
export default StudentMain;