import React, { useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminService from "../../pages/Admin/AdminService/AdminService";
import AdminTask from "../../pages/Admin/AdminTask/AdminTask";
import AdminTaskType from "../../pages/Admin/AdminTaskType/AdminTaskType";
import AdminUser from "../../pages/Admin/AdminUser/AdminUser";

type Props = {};

export default function AdminTemplate({}: Props) {
  const [sidebar, setSidebar] = useState(false);
  const [active, setActive] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();

  interface menuItem {
    title: "string";
    path: "string";
    icon: any;
  }

  const menuItem = [
    {
      path: "adminuser",
      title: "Quản lí người dùng",
      icon: <i className="fa-solid fa-user"></i>,
      // component:<AdminUser/>,
      className: "adminuser",
    },
    {
      path: "admintask",
      title: "Quản lí công việc",
      icon: <i className="fa-solid fa-briefcase"></i>,
      // component:<AdminTask/>,
      className: "admintask",
    },
    {
      path: "admintasktype",
      title: "Quản lí loại công việc",
      icon: <i className="fa-solid fa-filter"></i>,
      // component:<AdminTaskType/>,
      className: "admintasktype",
    },
    {
      path: "adminservice",
      title: "Quản lí dịch vụ",
      icon: <i className="fa-solid fa-list"></i>,
      // component:<AdminService/>,
      className: "adminservice",
    },
  ];

  return (
    <>
      <div className="admin-page ">
        <div className="top ">
          <div className="nav-left">
            <h3>Dashboard</h3>
            <div className="opensidebar" onClick={showSidebar}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="nav-right ">
            <div className="face">
              <span>Admin</span>
              <img src="https://i.pravatar.cc/50" alt="avatar" />
            </div>
            <div
              className="showlogout"
             
            >
              <div className="arrow"  onClick={() => {
                setActive(!active);
              }}>
                <i className="fa-solid fa-caret-down fs-2 text-white"></i>
              </div>

              {active ? (
                <div className="status ">
                  <p>Cập nhật thông tin</p>
                  <p>Đăng xuất</p>
                </div>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
        <div className="bottom">
          <div
            className="sidebarNav"
            style={sidebar ? { width: "14%" } : { width: "5%" }}
          >
            {/* <div className="closesidebar"  onClick={showSidebar}>
          <i className="fa-solid fa-xmark"></i>
        </div> */}
            <div className="menu">
              {menuItem.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      className="menuItem"
                      onClick={() => {
                        navigate(`${item.path}`);
                      }}
                    >
                      <span
                        className="icon"
                        style={sidebar ? { margin: "" } : { margin: "0 auto" }}
                      >
                        {item.icon}
                      </span>
                      <span
                        className="link_text"
                        style={
                          sidebar ? { display: "block" } : { display: "none" }
                        }
                      >
                        {item.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="admindata">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
