import React from "react"
import { Carousel } from "antd"
import { StaticImage } from "gatsby-plugin-image"
import { Button } from "react-scroll"

import "../styles/HeaderCarousel.css"

function HeaderCarousel() {
  return (
    <Carousel
      className="Header-carousel"
      autoplay
      autoplaySpeed={5000}
      effect={"fade"}
      pauseOnHover={false}
      dots={false}
    >
      <div data-testid="HeaderCarousel">
        <h1 className="Image-text">
          <span className="Text-span">
            Welcome to OpenSocial!!
            <br />
          </span>
        </h1>
        <p className="Image-subtext">
          <span className="Text-span">
            A Social Impact Open Source Projects Aggregator
          </span>
        </p>
        <Button
          className="Start-button"
          type="submit"
          value="Start Exploring"
          to="projects"
          smooth={true}
        />
        <StaticImage
          className="Carousel-img-wrapper"
          alt={"collaboration"}
          src={"../images/collaboration.jpg"}
          placeholder="blurred"
        />
      </div>
      <div>
        <h1 className="Image-text">
          <span className="Text-span">
            Into making Social Impact? <br />
          </span>
        </h1>
        <p className="Image-subtext">
          <span className="Text-span">
            Contribute with Non-profit Open Source Projects
          </span>
        </p>
        <Button
          className="Start-button"
          type="submit"
          value="Start Exploring"
          to="projects"
          smooth={true}
        />
        <StaticImage
          className="Carousel-img-wrapper"
          alt={"cooperation"}
          src={"../images/cooperation.jpg"}
          placeholder="blurred"
        />
      </div>
      <div>
        <h1 className="Image-text">
          <span className="Text-span">
            Explore and Collaborate!
            <br />
          </span>
        </h1>
        <p className="Image-subtext">
          <span className="Text-span">
            Find projects by Topics or the Language you love!
          </span>
        </p>
        <Button
          className="Start-button"
          type="submit"
          value="Start Exploring"
          to="projects"
          smooth={true}
        />
        <StaticImage
          className="Carousel-img-wrapper"
          alt={"community"}
          src={"../images/community.jpg"}
          placeholder="blurred"
        />
      </div>
    </Carousel>
  )
}

export default HeaderCarousel
