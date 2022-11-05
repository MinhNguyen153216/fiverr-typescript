import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/configStore";
import { getStore, USER_LOGIN } from "../../util/setting";
import { history } from "../../index";
import { getBookingJobApi } from "../../redux/reducers/userReducer";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);
type Props = {};

export default function UserDetail({}: Props) {
  const { userLogin } = useSelector((state: RootState) => state.userReducer);
  const { bookingJobs } = useSelector((state: RootState) => state.userReducer);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!userLogin) {
      Swal.fire({
        icon: "error",
        title: "Vui lòng đăng nhập",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
    } else {
      dispatch(getBookingJobApi());
    }
  }, [userLogin]);

  const renderAvatarContent = () => {
    return (
      <>
        <div className="avatar-status">
          <p>
            <span>.</span>
            Online
          </p>
        </div>
        <div className="avatar-content">
          {userLogin.avatar ? (
            <img src={userLogin.avatar} alt="..." />
          ) : (
            <span>{userLogin.name.substring(0, 1).toUpperCase()}</span>
          )}
          <p>{userLogin.name}</p>
          <FontAwesomeIcon icon={["fas", "pencil"]} className="fa" />
          <button className="btn btn-outline-secondary">
            Preview Fiverr Profile
          </button>
        </div>
        <div className="avatar-footer">
          <div className="avatar-footer-item">
            <p>
              <FontAwesomeIcon icon={["fas", "location-dot"]} className="fa" />
              From
            </p>
            <span>Vietnam</span>
          </div>

          <div className="avatar-footer-item">
            <p>
              <FontAwesomeIcon icon={["fas", "user"]} className="fa" />
              Member since
            </p>
            <span>Nov 2022</span>
          </div>
        </div>
      </>
    );
  };

  const renderInformation = () => {
    return (
      <>
        <div className="description">
          <div className="description-header">
            <p>Description</p>
            <span>Edit Description</span>
          </div>
          <div className="description-content">
            {userLogin ? <p>Nothing to show</p> : <p>...</p>}
          </div>
        </div>
        <div className="language">
          <div className="language-header">
            <p>Language</p>
            <span>Add new</span>
          </div>
          <div className="language-content">
            {userLogin ? <p>Nothing to show</p> : <p>...</p>}
          </div>
        </div>
        <div className="linked">
          <div className="linked-header">
            <p>Linked Accounts</p>
          </div>
          <div className="linked-content">
            <p>
              <FontAwesomeIcon icon={["fas", "plus"]} className="fa" />
              Facebook
            </p>
            <p>
              <FontAwesomeIcon icon={["fas", "plus"]} className="fa" />
              Google
            </p>
            <p>
              <FontAwesomeIcon icon={["fas", "plus"]} className="fa" />
              Dribble
            </p>
            <p>
              <FontAwesomeIcon icon={["fas", "plus"]} className="fa" />
              Stack Overflow
            </p>
            <p>
              <FontAwesomeIcon icon={["fas", "plus"]} className="fa" />
              Github
            </p>
            <p>
              <FontAwesomeIcon icon={["fas", "plus"]} className="fa" />
              Vimeo
            </p>
            <p>
              <FontAwesomeIcon icon={["fas", "plus"]} className="fa" />
              Twitter
            </p>
          </div>
        </div>

        <div className="skill">
          <div className="skill-header">
            <p>Skill</p>
            <span>Add new</span>
          </div>
          <div className="skill-content">
            {userLogin.skill ? (
              <p>{userLogin.skill}</p>
            ) : (
              <p>Add your Skills.</p>
            )}
          </div>
        </div>

        <div className="education">
          <div className="education-header">
            <p>Education</p>
            <span>Add new</span>
          </div>
          <div className="education-content">
            {userLogin ? <p>Nothing to show</p> : <p>Add your Education.</p>}
          </div>
        </div>

        <div className="certification">
          <div className="certification-header">
            <p>Certification</p>
            <span>Add new</span>
          </div>
          <div className="certification-content">
            {userLogin.certification ? (
              <p>{userLogin.certification}</p>
            ) : (
              <p>Add your Certification.</p>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderBookingJob = () => {
    if (userLogin.bookingJob.length > 0 || bookingJobs.length > 0) {
      return <></>;
    }
    return (
      <div className="gigs-notfound">
        <img src="./img/booking.png" alt="..." />
        <span>It seems that you don't have any active Gigs</span>
        <button className="btn btn-success">Create a new Gig</button>
      </div>
    );
  };

  return (
    <>
      <section className="profile pt-lg-5 pt-md-4 pt-sm-2 pb-lg-5 pb-md-4 pb-sm-2">
        <div className="container">
          <div className="profile-left">
            <div className="avatar">
              {userLogin ? renderAvatarContent() : <></>}
            </div>
            <div className="information">
              {userLogin ? renderInformation() : <></>}
            </div>
          </div>
          <div className="profile-right">
            <div className="gigs-banner">
              <h1>ACTIVE GIGS</h1>
            </div>
            <div className="gigs">{userLogin ? renderBookingJob() : <></>}</div>
          </div>
        </div>
      </section>
    </>
  );
}
