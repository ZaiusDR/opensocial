import React from "react";
import {Carousel} from "antd";
import {StaticImage} from "gatsby-plugin-image";

import '../styles/HeaderCarousel.css';

function HeaderCarousel() {
  return <Carousel
      className="Header-carousel"
      autoplay
      effect={'fade'}
    >
      <div>
        <h1 className="Image-text">
          <span className="Text-span">
              Welcome to Open Social!!<br/>
          </span>
        </h1>
        <p className="Image-subtext">
          <span className="Text-span">
            An Humanitarian Open Source Projects Aggregator
          </span>
        </p>
        <StaticImage
          className="Carousel-img-wrapper"
          alt={'collaboration'}
          src={'../images/collaboration.jpg'}
          placeholder="blurred"
        />
      </div>
      <div>
        <h1 className="Image-text">
            <span className="Text-span">
                Welcome to Open Social!!<br/>
            </span>
        </h1>
        <p className="Image-subtext">
            <span className="Text-span">
              An Humanitarian Open Source Projects Aggregator
            </span>
        </p>
        <StaticImage
          className="Carousel-img-wrapper"
          alt={'open-source'}
          src={'../images/open-source.jpg'}
          placeholder="blurred"
        />
      </div>
      <div>
        <h1 className="Image-text">
            <span className="Text-span">
                Welcome to Open Social!!<br/>
            </span>
        </h1>
        <p className="Image-subtext">
            <span className="Text-span">
              An Humanitarian Open Source Projects Aggregator
            </span>
        </p>
        <StaticImage
          className="Carousel-img-wrapper"
          alt={'community'}
          src={'../images/community.jpg'}
          placeholder="blurred"
        />
      </div>
    </Carousel>
}

export default HeaderCarousel
