import React from "react";
import { Outlet } from "react-router-dom";
import DashNavComponent from "../DashNavComponent";
import WardenSidebar from "./WardenSidebar";

const WardenMain = () => {
  return (
    <div className="dashboard">
      <DashNavComponent parentUrl={'/warden'} />
      <div className="wrapper">
        <WardenSidebar />

        <div id="content" className="py-3 bg-custom-light">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
export default WardenMain;