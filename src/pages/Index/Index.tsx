import React from "react";
import { NavLink } from "react-router-dom";

type Props = {};

export default function Index({}: Props) {
  return (
    <>
      <div className="index">
        <NavLink to={"/detail/1"}>detail1</NavLink>
      </div>
    </>
  );
}
