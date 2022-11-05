import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getJobTitleDetailApi } from "../../redux/reducers/congViecReducer";
import { history } from "../../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  DsChiTietLoai,
  DsNhomChiTietLoai,
} from "../../redux/models/congViecModel";

type Props = {};
library.add(fas);

export default function JobTitle({}: Props) {
  const params: any = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { jobTitleDetail } = useSelector(
    (state: RootState) => state.congViecReducer
  );

  let { id } = params;
  // console.log("-", jobTitleDetail);

  useEffect(() => {
    dispatch(getJobTitleDetailApi(id));
    // console.log("--", jobTitleDetail);
  }, [id]);

  const renderExploreContent = () => {
    return jobTitleDetail.dsNhomChiTietLoai.map(
      (item: DsNhomChiTietLoai, index: number) => {
        return (
          <div className="item" key={index}>
            <img src={item.hinhAnh} alt="..." />
            <h1>{item.tenNhom}</h1>
            {item.dsChiTietLoai.map((chiTiet: DsChiTietLoai, index: number) => {
              return (
                <p key={index}>
                  <NavLink to={`/categories/${chiTiet.id}`}>
                    {chiTiet.tenChiTiet}
                  </NavLink>
                </p>
              );
            })}
          </div>
        );
      }
    );
  };

  return (
    <>
      <section className="banner-job-title">
        <div className="container">
          <div className="content">
            <h1>{jobTitleDetail.tenLoaiCongViec}</h1>
            <p>Designs to make you stand out.</p>
            <button className="btn btn-outline-light">
              <FontAwesomeIcon icon={["far", "circle-play"]} className="fa" />
              <span>How Fiverr Works</span>
            </button>
          </div>
        </div>
      </section>

      <section className="popular-job-title">
        <div className="container mt-lg-5 mt-sm-3 mb-lg-5 mb-sm-3">
          <h1>Most popular in {jobTitleDetail.tenLoaiCongViec}</h1>
          <div className="content">
            <div className="item">
              <img src="./img/Logo design_2x.webp" alt="..." />
              <span>Minimalist Logo Design</span>
              <FontAwesomeIcon icon={["fas", "arrow-right"]} className="fa" />
            </div>

            <div className="item">
              <img src="./img/Architecture _ Interior Design_2x.webp" alt="..." />
              <span>Architecture & Interior Design</span>
              <FontAwesomeIcon icon={["fas", "arrow-right"]} className="fa" />
            </div>

            <div className="item">
              <img src="./img/Photoshop Editing_2x.webp" alt="..." />
              <span>Image Editing</span>
              <FontAwesomeIcon icon={["fas", "arrow-right"]} className="fa" />
            </div>

            <div className="item">
              <img src="./img/Nft Art.webp" alt="..." />
              <span>NFT Art</span>
              <FontAwesomeIcon icon={["fas", "arrow-right"]} className="fa" />
            </div>

            <div className="item">
              <img src="./img/T-Shirts _ Merchandise_2x.webp" alt="..." />
              <span>T-Shirts & Merchandise</span>
              <FontAwesomeIcon icon={["fas", "arrow-right"]} className="fa" />
            </div>
          </div>
        </div>
      </section>

      <section className="explore-job-title">
        <div className="container">
          <h1>Explore {jobTitleDetail.tenLoaiCongViec}</h1>
          <div className="content">
            {jobTitleDetail.dsNhomChiTietLoai ? renderExploreContent() : <></>}
          </div>
        </div>
      </section>

      <section className="related-job-title">
        <div className="container mt-lg-5 mb-lg-5 mt-md-4 mb-md-4 mt-sm-2 mb-sm-2 text-center">
          <h1 className="mb-lg-5 mb-md-4 mb-sm-2">
            Services Related To{" "}
            {jobTitleDetail.tenLoaiCongViec
              ? jobTitleDetail.tenLoaiCongViec
              : ""}
          </h1>
          <div className="tags">
            <span>Minimalist logo design</span>
            <span>Signature logo design</span>
            <span>Mascot logo design</span>
            <span>3d logo design</span>
            <span>Hand drawn logo design</span>
            <span>Vintage logo design</span>
            <span>Remove background</span>
            <span>Photo restoration</span>
            <span>Photo retouching</span>
            <span>Image resize</span>
            <span>Product label design</span>
            <span>Custom twitch overlay</span>
            <span>Custom twitch emotes</span>
            <span>Gaming logo</span>
            <span>Children book illustration</span>
          </div>
        </div>
      </section>
    </>
  );
}
