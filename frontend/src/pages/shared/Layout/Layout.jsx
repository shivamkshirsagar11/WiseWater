import React from "react";
import "./Layout.css";

import { Badge } from "antd";
import { customerMenu, guestMenu, ownerMenu, workerMenu } from './sideBarButtons'

import { Link, useNavigate, useLocation } from "react-router-dom";

const Layout = ({ children, removeCookies, userType }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        removeCookies('token');
        navigate('/login');
    }



    const sidebarMenu =
        userType === 'customer' ?
            customerMenu :
            userType === 'owner' ?
                ownerMenu :
                userType === 'worker' ?
                    workerMenu :
                    guestMenu

    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>Wise Water APP</h6>
                            <hr />
                        </div>
                        <div className="menu">
                            {sidebarMenu.map((menu, key) => {
                                const isActive = location.pathname === menu.path;
                                return (
                                    // <>
                                    <div key={key} className={`menu-item ${isActive && "active"}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                    // </>
                                );
                            })}
                            {userType !== 'guest' &&
                                <div className={`menu-item `} onClick={handleLogout}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    <Link to="/login">Logout</Link>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-content" style={{ cursor: 'pointer' }}>
                                <Badge
                                    // count={user && user.notifications.length}
                                    // this is changed by me
                                    count={5}
                                    onClick={() => {
                                        navigate('/notification')
                                    }}>
                                    <i className="fa-solid fa-bell"></i>
                                </Badge>
                                {/* <Link to="/profile">{user?.name}</Link> */}
                                <Link to="/profile">profile??</Link>
                            </div>
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;