import React from "react";
import { Outlet } from "react-router-dom";
import DashNavComponent from "../DashNavComponent";
import StudentSidebar from "./StudentSidebar";

const StudentMain=()=>{
    return(
    <div className="dashboard">
        <DashNavComponent parentUrl={'/student'}/>
        <div className="wrapper">
            <StudentSidebar/>

            <div id="content">
                <Outlet/>
            </div>
        </div>
    </div>
    )
}
export default StudentMain;