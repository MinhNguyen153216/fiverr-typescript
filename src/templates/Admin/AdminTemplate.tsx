import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminService from "../../pages/Admin/AdminService/AdminService";
import AdminUser from "../../pages/Admin/AdminUser/AdminUser";

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
     
      <div className="top ">
        <div className="nav-left">
          <h3>Dashboard</h3>
          <div className="opensidebar" onClick={showSidebar}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
        <div className="nav-right"></div>
      </div>
      <div className="bottom">
      <div
        className="sidebarNav"
        style={
          sidebar
            ? {width:'20%'}
            : { width:'6%' }   
        }
      >
        {/* <div className="closesidebar"  onClick={showSidebar}>
          <i className="fa-solid fa-xmark"></i>
        </div> */}
        <div className="menu">
          {menuItem.map((item, index) => {
            return (
              <NavLink to={item.path} key={index} >
                <div className="menuItem">
                  <span className="icon" style={sidebar?{margin:''}:{margin:'0 auto'}}>{item.icon}</span>
                  <span className="link_text" style={sidebar?{display:"block"}:{display:'none'}}>{item.title}</span>
                  {/* {item.icon}{item.title} */}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="adminuser"><AdminUser/></div>
      </div>
    </div>
  );
}
