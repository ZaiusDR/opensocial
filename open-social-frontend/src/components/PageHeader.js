import React from "react"

import loadable from "@loadable/component"
import { Button, Col, Row, Tooltip } from "antd"
import { StaticImage } from "gatsby-plugin-image"
import {
  QuestionCircleOutlined
} from "@ant-design/icons"

import "@fontsource/sedgwick-ave/latin-400.css"

import "../styles/PageHeader.css"

const Select = loadable(() => import("react-select"))


const PageHeader = (props) => {
  const sort_by = [
    { value: "total_commits", label: "Total Commits" },
    { value: "contributors", label: "Contributors" },
    { value: "rate", label: "Project Rate" },
  ]

  return(
    <Row
      className={props.isFixed ? "Page-header" : "Page-header fixed"}
      data-testid="PageHeader"
      align={"middle"}
      gutter={[14, 0]}
    >
      <Col flex={1}>
        <StaticImage
          src={"../images/icon.png"}
          alt={"unicorn"}
          height={44}
          layout="fixed"
        />
      </Col>
      <Col span="auto" flex={70}>
        <a className="Logo-title" href="https://www.open-social.net">
            OpenSocial
        </a>
      </Col>
      {props.isFixed ? null :
        <Col flex={1}>
          <Select
            onChange={props.onSortBy}
            options={sort_by}
            isClearable={true}
            isSearchable={false}
            placeholder="Sort by..."
            value={sort_by.find(option => {
              return option.value === props.sortedBy
            })}
          />
        </Col>
      }
      <Col span="auto" style={{ marginLeft: "auto" }} flex={1}>
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
