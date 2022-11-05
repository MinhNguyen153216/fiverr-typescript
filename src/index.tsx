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
import Register from "./pages/Register/Register";
import HeaderTemplate from "./templates/HeaderTemplate";
import JobDetail from "./pages/JobDetail/JobDetail";
import Result from "./pages/Result/Result";
import UserDetail from "./pages/UserDetail/UserDetail";
import AdminUser from "./pages/Admin/AdminUser/AdminUser";
import AdminTask from "./pages/Admin/AdminTask/AdminTask";
import AdminTaskType from "./pages/Admin/AdminTaskType/AdminTaskType";
import AdminService from "./pages/Admin/AdminService/AdminService";
import Categories from "./pages/Categories/Catagories";
import ResponsiveItem from "./HOC/Responsive/ResponsiveItem";
import AdminTemplate from "./templates/Admin/AdminTemplate";
import AdminTemplateMobile from "./templates/Admin/AdminTemplateMobile";
import Login from "./pages/Login/Login";
import Test from "./pages/Test";
import JobTitle from "./pages/JobTitle/JobTitle";
// import UserDetail from "./pages/UserDetail/UserDetail";
//

export const history = createBrowserHistory({ window });
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/test" element={<Test/>}/>
        <Route path="" element={<HeaderTemplate />}>
          <Route index element={<Index />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/result">
            <Route path=":name" element={<Result />}></Route>
          </Route>
          <Route path="/categories">
            <Route path=":id" element={<Categories />}></Route>
          </Route>
          <Route path="/jobdetail">
            <Route path=":id" element={<JobDetail />}></Route>
          </Route>
          <Route path="/title">
            <Route path=":id" element={<JobTitle />}></Route>
            <Route path="*" element={<Navigate to={"/home"} />}></Route>
          </Route>
          <Route path="/userdetail" element={<UserDetail />}></Route>
          <Route path="*" element={<Navigate to="" />}></Route>
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
        >
          <Route path="adminuser" element={<AdminUser />}></Route>
          <Route path="admintask" element={<AdminTask />}></Route>
          <Route path="admintasktype" element={<AdminTaskType />}></Route>
          <Route path="adminservice" element={<AdminService />}></Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HistoryRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
