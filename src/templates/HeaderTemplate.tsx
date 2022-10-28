import React from "react";
import { Outlet, Route, useLocation, Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import HeaderHome from "../components/Header/HeaderHome";
import ResponsiveItem from "../HOC/Responsive/ResponsiveItem";
import HeaderTemplateMobile from "./HeaderTemplateMobile";

type Props = {};

export default function HomeTemplate({}: Props) {
  const location = useLocation();
  const conditionalHeader = () => {
    if (location.pathname === "/") {
      return (
        <ResponsiveItem
          Component={HeaderHome}
          ComponentMobile={HeaderTemplateMobile}
        />
      );
    } else {
      // return <Header />;
      return (
        <ResponsiveItem
          Component={Header}
          ComponentMobile={HeaderTemplateMobile}
        />
      );
    }
  };
  return (
    <>
      {conditionalHeader()}
      <Outlet />
      <Footer />
    </>
  );
}
