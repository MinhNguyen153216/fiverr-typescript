import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

type Props = {};

export default function Footer({}: Props) {
  return (
    <section className="footer">
      <div className="container pt-2 pt-sm-4 pt-lg-5 ">
        <div className="top-footer pb-2 pb-sm-4 pb-lg-5">
          <div className="row">
            <div className="col">
              <p className="section">Categories</p>
              <p className="list">Graphics & Design</p>
              <p className="list">Digital Marketing</p>
              <p className="list">Writing & Translation</p>
              <p className="list">Video & Animation</p>
              <p className="list">Music & Audio</p>
              <p className="list">Programming & Tech</p>
              <p className="list">Data</p>
              <p className="list">Business</p>
              <p className="list">Lifestyle</p>
              <p className="list">Sitemap</p>
            </div>

            <div className="col">
              <p className="section">About</p>
              <p className="list">Careers</p>
              <p className="list">Press & News</p>
              <p className="list">Partnerships</p>
              <p className="list">Privacy Policy</p>
              <p className="list">Terms of Service</p>
              <p className="list">Intellectual Property Claims</p>
              <p className="list">Investor Relations</p>
            </div>

            <div className="col">
              <p className="section">Support</p>
              <p className="list">Help & Support</p>
              <p className="list">Trust & Safety</p>
              <p className="list">Selling on Fiverr</p>
              <p className="list">Buying on Fiverr</p>
            </div>

            <div className="col">
              <p className="section">Community</p>
              <p className="list">Events</p>
              <p className="list">Blog</p>
              <p className="list">Forum</p>
              <p className="list">Community Standards</p>
              <p className="list">Podcast</p>
              <p className="list">Affiliates</p>
              <p className="list">Invite a Friend</p>
              <p className="list">Become a Seller</p>
            </div>

            <div className="col">
              <p className="section">More From Fiverr</p>
              <p className="list">Fiverr Business</p>
              <p className="list">Fiverr Pro</p>
              <p className="list">fiverr Studios</p>
              <p className="list">Fiverr Logo Maker</p>
              <p className="list">Fiverr Guides</p>
              <p className="list">Get Inspired</p>
              <p className="list">Fiverr Select</p>
              <p className="list">
                ClearVoice
                <br />
                <span>Content Marketing</span>
              </p>
              <p className="list">
                Fiverr Workspace
                <br />
                <span>Invoice Software</span>
              </p>
              <p className="list">
                Learn
                <br />
                <span>Online Courses</span>
              </p>
              <p className="list">Working Not Working</p>
            </div>
          </div>
        </div>
        <div className="bottom-footer pt-3 pb-3">
          <div className="container d-flex justify-content-between">
            <div className="p-2">
              <img src="./img/Fiverr-Logo-2.png" alt="..." />
              <span>© Fiverr International Ltd. 2022</span>
            </div>

            <div className="d-flex p-2">
              <FontAwesomeIcon
                icon={["fab", "twitter"]}
                className="fa fa-icon"
              />
              <FontAwesomeIcon
                icon={["fab", "facebook"]}
                className="fa fa-icon"
              />
              <FontAwesomeIcon
                icon={["fab", "linkedin"]}
                className="fa fa-icon"
              />
              <FontAwesomeIcon
                icon={["fab", "pinterest"]}
                className="fa fa-icon"
              />
              <FontAwesomeIcon
                icon={["fab", "square-instagram"]}
                className="fa fa-icon"
              />
              <div className="d-flex setting">
                <p className="align-top">
                  <FontAwesomeIcon
                    icon={["fas", "globe"]}
                    className="fa fa-icon"
                  />
                  English
                </p>
                <p className="align-middle">US$ USD</p>
                <span>
                  <FontAwesomeIcon
                    icon={["fas", "person"]}
                    className="fa fa-icon"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
