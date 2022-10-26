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
import Categories from "./pages/Categories/Catagories";
import ResponsiveItem from "./HOC/Responsive/ResponsiveItem";
import AdminTemplate from "./templates/Admin/AdminTemplate";
import AdminTemplateMobile from "./templates/Admin/AdminTemplateMobile";
import Login from "./pages/Login/Login";
//


export const history = createBrowserHistory({ window });
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HeaderTemplate />}>
          <Route index element={<Index />}></Route>
          <Route path="/register"  element={<Register />}></Route>
          <Route path="/login"  element={<Login />}></Route>
          <Route path="/result">
            <Route path=":name" element={<Result />}></Route>
          </Route>
          <Route path="/categories">
            <Route path=":id" element={<Categories />}></Route>
          </Route>
          <Route path="/jobdetail">
            <Route path=":id" element={<JobDetail />}></Route>
          </Route>
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
