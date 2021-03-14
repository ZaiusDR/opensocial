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
          alt={'collaboration'}
          src={'../images/collaboration.jpg'}
        />
      </div>
      {/*<StaticImage alt={'open-source'} src={'../images/open-source.jpg'}/>*/}
      {/*<StaticImage alt={'community'} src={'../images/community.jpg'}/>*/}
    </Carousel>
}

export default HeaderCarousel
