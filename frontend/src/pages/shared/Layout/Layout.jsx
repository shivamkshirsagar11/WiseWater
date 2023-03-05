import React, { useContext } from "react";
import "./Layout.css";

import { Badge } from "antd";
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
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Wise Water</h6>
              <hr />
            </div>
            <div className="menu">
              {sidebarMenu.map((menu, key) => {
                const isActive = location.pathname === menu.path;
                return (
                  // <>
                  <div
                    key={key}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                  // </>
                );
              })}
              {userType !== "guest" && (
                <div
                  className={`menu-item `}
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Logout
                </div>
              )}
            </div>
          </div>
          <div className="content">
            <div className="body" style={{ "background-image": "linear-gradient(#b993d6, #8ca6db)" }}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
