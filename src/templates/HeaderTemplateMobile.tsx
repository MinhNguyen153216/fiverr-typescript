import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { NavLink } from "react-router-dom";
import { history } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
type Props = {};
const logo1 = "./img/Fiverr-Logo.png";

export default function HeaderTemplateMobile({}: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  return (
    <>
      <div className="headerMobile">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center h-100">
            <div className="sideBar">
              {/* Sidebar Overlay */}
              <div
                onClick={() => setIsSidebarOpen(false)}
                className={`sideBar-overlay ${
                  isSidebarOpen ? "block" : "hidden"
                }`}
              />
              <div>
                <button
                  className="btn-menu"
                  onClick={(): void => setIsSidebarOpen(!isSidebarOpen)}
                  type="button"
                >
                  <FontAwesomeIcon
                    icon={["fas", "bars"]}
                    className="fa"
                    type="button"
                  />
                </button>
              </div>

              {/* Sidebar */}
              <div
                className={`menuSideBar ${isSidebarOpen ? "block" : "hidden"}`}
              >
                <div className="menuSideBar-join d-flex align-items-center text-center mb-4">
                  <button className="btn btn-success">
                    <p>Join Fiverr</p>
                  </button>
                </div>

                {/* https://github.com/abhijithvijayan/react-minimal-side-navigation */}
                <Navigation
                  activeItemId="/"
                  onSelect={({ itemId }) => {
                    history.push(itemId);
                  }}
                  items={[
                    {
                      title: "Home",
                      itemId: "/",
                      // Optional
                      elemBefore: () => <></>,
                    },
                    {
                      title: "Sign In",
                      itemId: "/login",
                      // Optional
                      elemBefore: () => <></>,
                    },
                    {
                      title: "Browse Categories",
                      itemId: "/title/1",
                      elemBefore: () => <></>,
                      subNav: [
                        {
                          title: "Graphics & Design",
                          itemId: "/title/1",
                          // Optional
                          elemBefore: () => <></>,
                        },
                        {
                          title: "Digital Marketing",
                          itemId: "/title/2",
                          elemBefore: () => <></>,
                        },
                        {
                          title: "Writing & Translation",
                          itemId: "/title/3",
                          elemBefore: () => <></>,
                        },
                        {
                          title: "Video & Animation",
                          itemId: "/title/4",
                          elemBefore: () => <></>,
                        },
                        {
                          title: "Music & Audio",
                          itemId: "/title/5",
                          elemBefore: () => <></>,
                        },
                      ],
                    },
                    {
                      title: "Explore",
                      itemId: "/none/1",
                      subNav: [
                        {
                          title: "Discover",
                          itemId: "/none",
                        },
                        {
                          title: "Guides",
                          itemId: "/none",
                        },
                        {
                          title: "Learn",
                          itemId: "/none",
                        },
                        {
                          title: "Logo Maker",
                          itemId: "/none",
                        },
                        {
                          title: "Community",
                          itemId: "/none",
                        },
                        {
                          title: "Podcast",
                          itemId: "/none",
                        },
                        {
                          title: "Blog",
                          itemId: "/none",
                        },
                        {
                          title: "Fiverr Workspace",
                          itemId: "/none",
                        },
                      ],
                    },{
                      title: "Fiverr Business",
                      itemId: "/none/2",
                    }
                  ]}
                />
              </div>
            </div>

            <div className="logo">
              <NavLink className="navbar-brand" to={""}>
                <img src={logo1} alt="fiverrLogo" width={89} height={49} />
              </NavLink>
            </div>
            <div className="join">
              <NavLink to={"/register"}>
                <p>Join</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
