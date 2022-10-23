import React from "react";
import { NavLink } from "react-router-dom";
import { Carousel } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";

library.add(fas);

type Props = {};

const contentStyle: React.CSSProperties = {
  height: "680px",
  color: "#fff",
  // lineHeight: "680px",
  textAlign: "center",
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} slick-prev-custom`}
      style={{ ...style, display: "block"}}
      onClick={onClick}
    >
      <i className="arrow right"></i>
    </div>
  );
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 5,
      },
    },
  ],
};

export default function Index({}: Props) {
  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const value: string | undefined = document.querySelector<HTMLInputElement>(
      'input[name="searchInputCarousel"]'
    )?.value;
    console.log(value);
  };

  return (
    <>
      <section className="carousel">
        <Carousel fade>
          <div>
            <div className="carousel1" style={contentStyle}>
              <div className="row">
                <div className="col-6"></div>
                <div className="col-6">
                  <p>
                    Gabrielle, <span>Video Editor</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="carousel2" style={contentStyle}>
              <div className="row">
                <div className="col-6"></div>
                <div className="col-6">
                  <p>
                    Zach, <span>Bar Owner</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="carousel3" style={contentStyle}>
              <div className="row">
                <div className="col-6"></div>
                <div className="col-6">
                  <p>
                    Ritika, <span>Shoemaker and Designer</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="carousel4" style={contentStyle}>
              <div className="row">
                <div className="col-6"></div>
                <div className="col-6">
                  <p>
                    Moon, <span>Marketing Expert</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="carousel5" style={contentStyle}>
              <div className="row">
                <div className="col-6"></div>
                <div className="col-6">
                  <p>
                    Andrea, <span>Fashion Designer</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Carousel>

        <div className="search">
          <div className="container">
            <div className="searchLeft">
              <h1>
                Find the perfect <i> freelance </i> services for your business
              </h1>

              <form className="d-flex" role="search" onSubmit={handleSearch}>
                <input
                  className="form-control"
                  type="search"
                  name="searchInputCarousel"
                  placeholder='Try "building mobile app"'
                  aria-label="Search"
                />
                <button className="btn btn-success" type="submit">
                  Search
                </button>
              </form>

              <div className="d-flex popular">
                <span>Popular: </span>
                <div className="btn">Website Design</div>
                <div className="btn">WordPress</div>
                <div className="btn">Logo Design</div>
                <div className="btn">Video Editing</div>
              </div>
            </div>
            <div className="searchRight"></div>
          </div>
        </div>
      </section>

      <section className="trustedBy bg-light mb-xl-5 mb-lg-4 mb-sm-1">
        <div className="container d-flex justify-content-center align-items-center">
          <img src="./img/facebook.png" alt="facebook" />
          <img src="./img/google.png" alt="google" />
          <img src="./img/netflix.png" alt="netflix" />
          <img src="./img/pandg.png" alt="pandg" />
          <img src="./img/paypal.png" alt="paypal" />
        </div>
      </section>

      <section className="professional">
        <div className="container">
          <h1>Popular professional services</h1>
          <div className="row ">
            <Slider {...settings}>
              <div className="col">
                <div className="item">
                  <img src="./img/logo-design-2x.webp" alt="" />
                </div>
              </div>
              <div className="col">
                <div className="item">
                  <img src="./img/logo-design-2x.webp" alt="" />
                </div>
              </div>
              <div className="col">
                <div className="item">
                  <img src="./img/logo-design-2x.webp" alt="" />
                </div>
              </div>
              <div className="col">
                <div className="item">
                  <img src="./img/logo-design-2x.webp" alt="" />
                </div>
              </div>
              <div className="col">
                <div className="item">
                  <img src="./img/logo-design-2x.webp" alt="" />
                </div>
              </div>
              <div className="col">
                <div className="item">
                  <img src="./img/logo-design-2x.webp" alt="" />
                </div>
              </div>
              <div className="col">
                <div className="item">
                  <img src="./img/logo-design-2x.webp" alt="" />
                </div>
              </div>
              <div className="col">
                <div className="item">
                  <img src="./img/logo-design-2x.webp" alt="" />
                </div>
              </div>
              <div className="col">
                <div className="item">
                  <img src="./img/logo-design-2x.webp" alt="" />
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
}
