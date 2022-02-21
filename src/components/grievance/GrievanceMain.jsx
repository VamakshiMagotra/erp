import React from "react";
import { Outlet } from "react-router-dom";
import DashNavComponent from "../DashNavComponent";
import GrievanceSidebar from "./GrievanceSidebar";

const GrievanceMain = () => {
  return (
    <div className="dashboard">
      <DashNavComponent parentUrl={'/grievance'} />
      <div className="wrapper">
        <GrievanceSidebar />

        <div id="content" className="py-3 bg-custom-light">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
export default GrievanceMain;