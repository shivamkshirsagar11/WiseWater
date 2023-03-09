import React, { useContext } from "react";
import "./Layout.css";
import MultiToast from  "../../../actions/shared/MultiToast.js"
import {
  adminMenu,
  customerMenu,
  guestMenu,
  ownerMenu,
  workerMenu,
} from "./sideBarButtons";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { CookiesContext } from "../../../context/CookiesProvider";

const Layout = ({ children, userType }) => {
  const { removeCookies } = useContext(CookiesContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    removeCookies("token");
    MultiToast("Successfully logged out", false);
    navigate("/");
  };

  const sidebarMenu =
    userType === "customer"
      ? customerMenu
      : userType === "owner"
        ? ownerMenu
        : userType === "worker"
          ? workerMenu
          : userType === "admin"
            ? adminMenu
            : guestMenu;

  return (
    <div style={{ backgroundColor: "#64b5f6" }}>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div >
              <h3 className="text-center">Navigation Panel</h3>
              <hr />
            </div>
            <div className="menu">
              {sidebarMenu.map((menu, key) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={key}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon} ></i>
                    <Link to={menu.path} style={{ text: "center" }}>{menu.name}</Link>
                  </div>
                );
              })}
              {userType !== "guest" && (
                <div
                  className={`menu-item `}
                  onClick={handleLogout}
                  style={{ cursor: "pointer", fontWeight: "400", fontSize: "1.2rem" }}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </div>
              )}
            </div>
          </div>
          <div className="content">
            <div className="body" style={{ backgroundColor: "#ede7f6" }}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Layout;
