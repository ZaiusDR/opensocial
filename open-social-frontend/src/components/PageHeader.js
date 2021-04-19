import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Header } from "antd/es/layout/layout"

import "@fontsource/sedgwick-ave/400.css"

import "../styles/PageHeader.css"

function PageHeader() {
  return (
    <Header className="Page-header" style={{ backgroundColor: "#00334e" }}>
      <a href="https://www.open-social.net">
        <div className="Logo-container">
          <StaticImage
            src={"../images/icon.png"}
            alt={"unicorn"}
            height={44}
            layout="fixed"
          />
          <h1 className="Logo-title">OpenSocial</h1>
        </div>
      </a>
    </Header>
  )
}

export default PageHeader
