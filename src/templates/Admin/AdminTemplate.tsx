import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminService from "../../pages/Admin/AdminService/AdminService";

type Props = {};

export default function AdminTemplate({}: Props) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  interface menuItem {
    title: "string";
    path: "string";
    icon: any;
  }

  const menuItem = [
    {
      path: "/adminuser",
      title: "Quản lí người dùng",
      icon: <i className="fa-solid fa-user"></i>,
    },
    {
      path: "/admintask",
      title: "Quản lí công việc",
      icon: <i className="fa-solid fa-briefcase"></i>,
    },
    {
      path: "/admintasktype",
      title: "Quản lí loại công việc",
      icon: <i className="fa-solid fa-filter"></i>,
    },
    {
      path: "/adminservice",
      title: "Quản lí dịch vụ",
      icon: <i className="fa-solid fa-list"></i>,
    },
  ];

  return (
    <div className="admin-page ">
      {/* <div className="d-flex" style={{ minHeight: "100vh" }}>
        <div className="sidebar p-5" style={{backgroundColor:'#46546c'}}>
          <nav className="d-flex flex-column " >
            <div className="sidebarTop d-flex">
            <a className="text-white me-3" href="#">Dashboard</a>
            <i className="fa-solid fa-bars text-white"></i>
            </div>
            <div className="menu d-flex flex-column">
            <a className="text-white" href="#">Quản lí người dùng</a>
            <a className="text-white" href="#">Quản lí công việc</a>
            <a className="text-white" href="#">Quản lí loại công việc</a>
            <a className="text-white" href="#">Quản lí dịch vụ</a>
            </div>
          </nav>
        </div>
        <div className="main">
         
        </div>
      </div> */}
      <div className="nav">
        <div className="nav-left">
          <h3>Dashboard</h3>
          <div className="opensidebar" onClick={showSidebar}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
        <div className="nav-right"></div>
      </div>
      <div
        className="sidebarNav"
        style={
          sidebar
            ? { position: "fixed", top: "0", left: "0%" }
            : { position: "fixed", top: "0", left: "-100%" }
        }
      >
        <div className="closesidebar" onClick={showSidebar}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="menu">
        {/* <i className="fa-solid fa-bars"></i> */}

          
          {menuItem.map((item, index) => {
            return (
              <NavLink to={item.path} key={index} className="link">
                <div>
                  <span className="icon">{item.icon}</span>
                  <span className="link_text">{item.title}</span>
                  {/* {item.icon}{item.title} */}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
