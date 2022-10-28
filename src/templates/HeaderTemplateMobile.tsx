import React, { useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { history } from "../index";
type Props = {};

export default function HeaderTemplateMobile({}: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
      <div className="headerMobile">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div className="sideBar">
              {/* Sidebar Overlay */}
              <div
                onClick={() => setIsSidebarOpen(false)}
                className={`test ${
                  isSidebarOpen ? "block" : "hidden"
                }`}
              />
              <div>
                <button
                  className="btn-menu"
                  onClick={(): void => setIsSidebarOpen(!isSidebarOpen)}
                  type="button"
                >
                  <p>burger</p>
                </button>
              </div>

              {/* Sidebar */}
              <div
                className={`menuSideBar ${
                  isSidebarOpen
                    ? "block"
                    : "hidden"
                }`}
              >
                <div className="flex items-center justify-center mt-10 text-center py-6">
                  <span className="mx-2 text-2xl font-semibold text-black">
                    react-minimal-side-navigation
                  </span>
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
                      elemBefore: () => <p>coffee</p>,
                    },
                    {
                      title: "About",
                      itemId: "",
                      elemBefore: () => <p>user</p>,
                      subNav: [
                        {
                          title: "Projects",
                          itemId: "/about/projects",
                          // Optional
                          elemBefore: () => <p>cloud</p>,
                        },
                        {
                          title: "Members",
                          itemId: "/about/members",
                          elemBefore: () => <p>coffee</p>,
                        },
                      ],
                    },
                    {
                      title: "Another Tab",
                      itemId: "/another",
                      subNav: [
                        {
                          title: "Teams",
                          itemId: "/another/teams",
                          // Optional
                          // elemBefore: () => <Icon name="calendar" />
                        },
                      ],
                    },
                  ]}
                />
              </div>
            </div>

            <div className="logo">
              <p>Logo</p>
            </div>
            <div className="join">
              <p>Join</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
