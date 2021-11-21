import React from "react"

import { Row, Col, Rate, Collapse, Divider } from "antd"
import {
  EyeOutlined,
  ExclamationCircleOutlined,
  ForkOutlined,
  PullRequestOutlined,
  TeamOutlined,
  StarOutlined,
} from "@ant-design/icons"

import "antd/dist/antd.css"
import "../styles/Project.css"

import ProjectGraph from "./Graph"

const { Panel } = Collapse

function Project(props) {
  return (
    <li data-testid="Project" key={props.project.full_name} className="Project-item">
      <Row>
        <Col span={24} className="Project" align="middle">
          <Row align={"middle"}>
            <Col span={22} className="Project-name">
              <img
                className="Avatar-img"
                alt="avatar"
                src={props.project.avatar_url}
              />
              <a href={props.project.project_url}>
                <b>{props.project.project_name}</b>
              </a>
            </Col>
          </Row>
          <Col span={24} className="Project-details">
            <Row>
              <Col span={16} xs={24} md={16}>
                <b>Project Rate: </b>
                <Rate
                  className="Project-rate"
                  disabled
                  allowHalf
                  defaultValue={(props.project.rate * 10) / 2}
                  character={<span className="icon-unicorn_rate" />}
                /><br/>
                <b>Description:</b> {props.project.description}<br/>
                <b>Full Name:</b> {props.project.full_name}<br/>
                <b>Language:</b>{" "}
                {props.project.language ? props.project.language : "N/A"}
              </Col>
              <Col span={8} xs={24} md={8}>
                <b>
                  <TeamOutlined style={{ color: "#00334e" }} /> Contributors:
                </b>{" "}
                {props.project.contributors}<br/>
                <b>
                  <ExclamationCircleOutlined style={{ color: "red" }} /> Open
                  Issues:
                </b>{" "}
                {props.project.open_issues}<br/>
                <b>
                  <PullRequestOutlined style={{ color: "green" }} /> Total
                  Commits:
                </b>{" "}
                {props.project.total_commits}<br/>
              </Col>
            </Row>
            <Divider />
          </Col>
          <Collapse ghost>
            <Panel header={<b>More details</b>} key={1}>
              <Row className="Stats">
                <Col span={12} className="Stats-activity">
                    <b>
                      <EyeOutlined style={{ color: "#00334e" }} /> Watchers:
                    </b>{" "}
                    {props.project.watchers}<br/>
                    <b>
                      <StarOutlined style={{ color: "#00334e" }} /> Stargazers:
                    </b>{" "}
                    {props.project.stargazers}<br/>
                    <b>
                      <ForkOutlined style={{ color: "#00334e" }} /> Forks:
                    </b>{" "}
                    {props.project.forks}<br/>
                </Col>
                <Col span={12} className="Stats-dates">
                    <b>Pushed:</b>{" "}
                    {new Date(props.project.pushed).toLocaleDateString()}
                    <br/><b>Created:</b>{" "}
                    {new Date(props.project.created).toLocaleDateString()}
                    <br/><b>Updated:</b>{" "}
                    {new Date(props.project.updated).toLocaleDateString()}
                </Col>
              </Row>
            </Panel>
          </Collapse>
          <Col
            span={24}
            className="Graph-data"
            style={{ marginBottom: "16px" }}
          >
            <div>
              <b>Recent Commits Activity:</b>
            </div>
            <ProjectGraph data={props.project.commits_graph_data} />
          </Col>
        </Col>
      </Row>
    </li>
  )
}

export default Project
