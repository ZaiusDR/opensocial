import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Header } from "antd/es/layout/layout"
import {
  QuestionCircleOutlined
} from "@ant-design/icons"

import "@fontsource/sedgwick-ave/latin-400.css"

import "../styles/PageHeader.css"
import { Button, Col, Row, Tooltip } from "antd"

const PageHeader = (props) => {
  return(
    <Header data-testid="PageHeader" className="Page-header">
      <Row align={"middle"} >
        <Col span={6} className="Logo-container">
          <StaticImage
            src={"../images/icon.png"}
            alt={"unicorn"}
            height={44}
            layout="fixed"
          />
          <a href="https://www.open-social.net">
              <h1 className="Logo-title">OpenSocial</h1>
          </a>
        </Col>
        <Col span={1} offset={17}>
          <Tooltip title="Why OpenSocial?">
            <Button
              onClick={() => props.onClick()}
              className="Modal-button"
              type="text"
              shape="circle"
              icon={
                <QuestionCircleOutlined
                  style={{color: "white", fontStyle: "bold", fontSize: "1.3rem"}}
                />
              }
            >
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </Header>
  )
}

export default PageHeader
