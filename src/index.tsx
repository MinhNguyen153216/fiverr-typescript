import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  Outlet,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./assets/scss/styles.scss";
import Index from "./pages/Index/Index";
import UserTemplate from "./templates/User/UserTemplate";
import JobDetail from "./pages/JobDetail/JobDetail";
import JobTitle from "./pages/JobTitle/JobTitle";
import HomeTemplate from "./templates/Home/HomeTemplate";
//

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Index />} />
          <Route path="home" element={<Index />} />
          <Route path="detail" element={<JobDetail />} />
          <Route path="title" element={<JobTitle />} />
        </Route>

        {/* <Route path="job" element={<UserTemplate />}>
          
          <Route path="detail" element={<JobDetail />} />
          <Route path="title" element={<JobTitle />} />
        </Route> */}

        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
