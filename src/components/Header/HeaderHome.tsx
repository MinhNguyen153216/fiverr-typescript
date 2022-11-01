import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import { logOutUserAction } from "../../redux/reducers/nguoiDungReducer";
import {
  congViecModel,
  DsChiTietLoai,
  DsNhomChiTietLoai,
} from "../../redux/models/congViecModel";
import { getMenuCongViecApi } from "../../redux/reducers/congViecReducer";
import { timeout } from "../../util/setting";

library.add(fas);

type Props = {};
const logo1 = "./img/Fiverr-Logo.png";
const logo2 = "./img/Fiverr-Logo-small.png";

export default function HeaderHome({}: Props) {
  const [small, setSmall] = useState(false);
  const { userLogin } = useSelector(
    (state: RootState) => state.nguoiDungReducer
  );
  const { menuCongViec } = useSelector(
    (state: RootState) => state.congViecReducer
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMenuCongViecApi());
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 100)
      );
    }

    return () => {
      // console.log("clean");
      window.removeEventListener("scroll", () =>
        setSmall(window.pageYOffset > 100)
      );
    };
  }, []);

  const renderLogin = () => {
    if (!userLogin) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to={"/register"}>
              Sign In
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/login"}>
              <button
                className={`btn ${
                  small ? "btn-outline-success" : "btn-outline-light"
                }`}
              >
                Join
              </button>
            </NavLink>
          </li>
        </>
      );
    }
    return (
      <>
        <li className="nav-item">
          <NavLink className="nav-link" to={"/userdetail"}>
            {userLogin.name}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={""} onClick={handleLogout}>
            <button
              className={`btn ${
                small ? "btn-outline-success" : "btn-outline-light"
              }`}
            >
              LogOut
            </button>
          </NavLink>
        </li>
      </>
    );
  };
  const renderTitle = () => {
    return menuCongViec.map((loaiCongViec: congViecModel, index: number) => {
      return (
        <div className="navbar-brand" key={index}>
          <NavLink to={`/title/${loaiCongViec.id}`}>
            <p>{loaiCongViec.tenLoaiCongViec}</p>
          </NavLink>
          <div className="title-detail">
            <div className="container p-2">
              <div className="row p-2">
                {loaiCongViec.dsNhomChiTietLoai.map(
                  (dsNhom: DsNhomChiTietLoai, index: number) => {
                    return (
                      <div className="col pb-2" key={index}>
                        <p className="job-group pb-1">{dsNhom.tenNhom}</p>
                        {dsNhom.dsChiTietLoai.map(
                          (dsChiTiet: DsChiTietLoai, index: number) => {
                            return (
                              <NavLink
                                to={`/categories/${dsChiTiet.id}`}
                                className="job-group-detail"
                                key={index}
                              >
                                {dsChiTiet.tenChiTiet}
                              </NavLink>
                            );
                          }
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const value: string | undefined = document.querySelector<HTMLInputElement>(
      'input[name="searchInput"]'
    )?.value;
    timeout(1000);
    navigate(`/result/${value}`);
  };
  const handleLogout = () => {
    console.log("logout");
    dispatch(logOutUserAction(userLogin));
  };

  return (
    <>
      <section className={`headerHome ${small ? "headerHomeScroll" : ""}`}>
        <div className="navbar navbar-expand-sm navbar-light">
          <div className="container">
            <NavLink className="navbar-brand" to={""}>
              {small ? (
                <img
                  src={logo1}
                  alt="fiverrLogo"
                  width={89}
                  height={49}
                />
              ) : (
                <img
                  src={logo2}
                  alt="fiverrLogo"
                  width={97}
                  height={28}
                />
              )}
            </NavLink>

            <div
              className="collapse navbar-collapse navbar-search"
              id="collapsibleNavId"
            >
              <form
                className="d-flex my-2 my-lg-0 w-100"
                onSubmit={handleSearch}
              >
                <input
                  className="form-control"
                  type="text"
                  name="searchInput"
                  placeholder="What services you're looking for today ?"
                />
                <button className="btn btn-dark my-2 my-sm-0" type="submit">
                  <i className="fa-solid fa-magnifying-glass" />
                </button>
              </form>
            </div>

            <nav className="navbar navbar-expand-lg navbar-signin">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a
                        className="nav-link primary-color"
                        aria-current="page"
                        href="#"
                      >
                        Fiverr Business
                      </a>
                    </li>
                    <li className="nav-item link-desktop">
                      <a className="nav-link " href="#">
                        Explore
                      </a>
                    </li>
                    <li className="nav-item link-desktop">
                      <a className="nav-link " href="#">
                        <FontAwesomeIcon
                          icon={["fas", "globe"]}
                          className="fa"
                        />
                        English
                      </a>
                    </li>
                    <li className="nav-item link-desktop">
                      <a className="nav-link" href="#">
                        US$ USD
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        Become a Seller
                      </a>
                    </li>
                    <>{renderLogin()}</>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </section>

      <section
        className={`nav-title navbar bg-white navTitle ${
          small ? "navTitleScroll" : ""
        }`}
      >
        <div className="container">{renderTitle()}</div>
      </section>
    </>
  );
}
