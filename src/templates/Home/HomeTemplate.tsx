import React from "react";
import { Outlet, Route, useLocation, Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import HeaderHome from "../../components/Header/HeaderHome";

type Props = {};

export default function HomeTemplate({}: Props) {
  const location = useLocation();
  const conditionalHeader = () => {
    if (location.pathname === "/") {
      return <HeaderHome />;
    }
    return <Header />;
  };
  return (
    <>
      {conditionalHeader()}
      <Outlet />
      <Footer />
    </>
  );
}
