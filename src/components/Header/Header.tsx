import React, { ReactNode, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { AppDispatch, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { getMenuCongViecApi } from "../../redux/reducers/congViecReducer";
import {
  congViecModel,
  DsNhomChiTietLoai,
  DsChiTietLoai,
} from "../../redux/models/congViecModel";
import { logOutUserAction } from "../../redux/reducers/nguoiDungReducer";
import { ACCESS_TOKEN, timeout } from "../../util/setting";
library.add(fas);

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
type Props = {};
const logo = "./img/Fiverr-Logo.png";

export default function Header({}: Props) {
  const { userLogin } = useSelector(
    (state: RootState) => state.nguoiDungReducer
  );
  console.log(userLogin);
  const { menuCongViec } = useSelector(
    (state: RootState) => state.congViecReducer
  );
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMenuCongViecApi());
  }, []);

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

  const renderLogin = () => {
    if (!userLogin) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to={"/login"}>
              Sign In
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/register"}>
              <button className="btn btn-outline-success">Join</button>
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
            <button className="btn btn-outline-success">LogOut</button>
          </NavLink>
        </li>
      </>
    );
  };

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const value: string | undefined = document.querySelector<HTMLInputElement>(
      'input[name="searchInput"]'
    )?.value;
    console.log(value);
    await timeout(1000);
    navigate(`/result/${value}`);
  };

  const handleLogout = () => {
    console.log("logout");
    dispatch(logOutUserAction(userLogin));
  };
  return (
    <>
      <nav className="header navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to={""}>
            <img src={logo} alt="fiverrLogo" width={89} height={49} />
          </NavLink>

          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <form className="d-flex my-2 my-lg-0 w-100" onSubmit={handleSearch}>
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

          <nav className="navbar navbar-expand-lg bg-light navbar-signin">
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
                      <FontAwesomeIcon icon={["fas", "globe"]} className="fa" />
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
      </nav>

      <nav className="nav-title navbar bg-white">
        <div className="container">{renderTitle()}</div>
      </nav>
    </>
  );
}
