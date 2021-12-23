import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toAbsoluteUrl } from "../helpers/imagePathHelper";
import { Dropdown } from "react-bootstrap";
import UserService from "../services/UserService";

const DashNavComponent = ({
  parentUrl,
}) => {

  const [isSideBarOpen, updateSideBarOpen] = useState(true);
  const navigate = useNavigate();

  const logoutUser = () => {
    UserService.logoutUser()
      .then((resp) => {
        navigate("/");
      }).catch((err) => {
        navigate("/");
      });
  };

  useEffect(() => {
    UserService.verifyUser()
      .then((resp) => {})
      .catch((err) => {
        logoutUser();
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <div className="ms-auto navbar-nav">
            <Dropdown>
              <Dropdown.Toggle className="bg-custom-grey shadow-none text-custom-dark border-0">
                <i class="fas fa-user-tie" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <button onClick={logoutUser} className="btn d-block w-100 shadow-none">Logout</button>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashNavComponent;
