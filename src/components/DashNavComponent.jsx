import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toAbsoluteUrl } from "../helpers/imagePathHelper";

const DashNavComponent = ({
  parentUrl,
}) => {

  const [isSideBarOpen, updateSideBarOpen] = useState(true);

  const toggleSideBar = () => {
    if (isSideBarOpen) {
      document.getElementById('sidebar').classList.remove('is-active');
    } else {
      document.getElementById('sidebar').classList.add('is-active');
    }
    updateSideBarOpen(!isSideBarOpen);
  }

  return (
    <nav className="fixed-top navbar bg-custom-dark text-custom-grey font-roboto">
      <div className="container-fluid">
        <div className="navbar-collapse d-flex align-items-center">
          <button className='sidebar-toggler' onClick={toggleSideBar}>
            <div className={`hamburger ${(isSideBarOpen) ? 'is-active' : ''}`}>
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </div>
          </button>
          <NavLink className="navbar-brand" to={parentUrl}>
            <img src={toAbsoluteUrl('logo.png')} alt="SMVDU" height="40px" />
            ERP
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default DashNavComponent;
