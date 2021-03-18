import React from "react";
import {StaticImage} from "gatsby-plugin-image";
import {Header} from "antd/es/layout/layout";

import '../styles/PageHeader.css'


function PageHeader() {
  return <Header className="Page-header" >
    <div className="Logo-container" >
      <StaticImage
        src={'../images/icon.png'}
        alt={'unicorn'}
        height={44}
        layout='fixed'
      />
      <h1 className="Logo-title">Open Social</h1>
    </div>
  </Header>
}

export default PageHeader;
