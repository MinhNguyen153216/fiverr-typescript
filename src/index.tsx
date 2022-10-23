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
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./assets/scss/styles.scss";
import Index from "./pages/Index/Index";
import UserTemplate from "./templates/User/UserTemplate";
import JobDetail from "./pages/JobDetail/JobDetail";
import JobTitle from "./pages/JobTitle/JobTitle";
import HomeTemplate from "./templates/Home/HomeTemplate";
import AdminTemplate from "./templates/Admin/AdminTemplate";
import ResponsiveItem from "./HOC/Responsive/ResponsiveItem";
import AdminTemplateMobile from "./templates/Admin/AdminTemplateMobile";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Result from "./pages/Result/Result";
import UserDetail from "./pages/UserDetail/UserDetail";
//


export const history = createBrowserHistory({ window });
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        {/* User Route */}
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Index />} />
          <Route path="home" element={<Index />} />

          {/* <Route path="detail" element={<JobDetail />} /> */}
          <Route path="detail">
            <Route path=":id" element={<JobDetail />} />
          </Route>

          {/* <Route path="title" element={<JobTitle />} /> */}
          <Route path="title">
            <Route path=":id" element={<JobTitle />} />
          </Route>

          <Route path="result" element={<Result />} />
          <Route path="result">
            <Route path=":id" element={<Result />} />
          </Route>

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="userdetail" element={<UserDetail />} />
        </Route>
       

        {/* Admin Route */}
        <Route
          path="admin"
          element={
            <ResponsiveItem
              Component={AdminTemplate}
              ComponentMobile={AdminTemplateMobile}
            />
          }
        ></Route>

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HistoryRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
