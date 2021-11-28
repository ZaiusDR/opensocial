import React from "react"

import { Button, Col, Row, Tooltip } from "antd"
import { StaticImage } from "gatsby-plugin-image"
import {
  QuestionCircleOutlined
} from "@ant-design/icons"

import "@fontsource/sedgwick-ave/latin-400.css"

import "../styles/PageHeader.css"

const PageHeader = (props) => {
  return(
    <Row data-testid="PageHeader" align={"middle"} gutter={[14, 14]} className="Page-header">
      <Col flex="0 1 auto">
        <StaticImage
          src={"../images/icon.png"}
          alt={"unicorn"}
          height={44}
          layout="fixed"
        />
      </Col>
      <Col span="auto">
        <a className="Logo-title" href="https://www.open-social.net">
            OpenSocial
        </a>
      </Col>
      <Col span="auto" style={{ marginLeft: "auto" }}>
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
  )
}

export default PageHeader
