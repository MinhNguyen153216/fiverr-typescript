import React from "react";

type Props = {};

export default function AdminTemplate({}: Props) {
  return (
    <div>
      <div className="d-flex" style={{ minHeight: "100vh" }}>
        <div className="menu w-25  p-5" style={{backgroundColor:'#46546c'}}>
          <nav className="d-flex flex-column " >
            <a className="text-white" href="#">Dashboard</a>
            <a className="text-white" href="#">Quản lí người dùng</a>
            <a className="text-white" href="#">Quản lí sản phẩm</a>
          </nav>
        </div>
        <div className="content w-75">
          {/* <props.Component /> */}
          {/* {props.Component} */}
        </div>
      </div>
    </div>
  );
}
