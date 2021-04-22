import React from "react"

import loadable from "@loadable/component"
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

const ProjectGraph = loadable(() => import("./ProjectGraph.js"))

const { Panel } = Collapse

function Project(props) {
  return (
    <li data-testid="Project" key={props.project.full_name} className="Project-item">
      <Row>
        <Col span={24} className="Project" align="middle">
          <Row align={"middle"}>
            <Col span={24} className="Project-name">
              <a href={props.project.project_url}>
                <b>{props.project.project_name}</b>
              </a>
            </Col>
          </Row>
          <Col span={24} className="Project-details">
            <Row align="middle">
              <Col style={{ paddingRight: "5px" }}>
                <b>Project Rate: </b>
              </Col>
              <Col>
                <Rate
                  className="Project-rate"
                  disabled
                  allowHalf
                  defaultValue={(props.project.rate * 10) / 2}
                  character={<span className="icon-unicorn_rate" />}
                />
              </Col>
            </Row>
            <div>
              <b>Description:</b> {props.project.description}
            </div>
            <div>
              <b>Full Name:</b> {props.project.full_name}
            </div>
            <div>
              <b>Language:</b>{" "}
              {props.project.language ? props.project.language : "N/A"}
            </div>
            <Divider />
            <div>
              <b>
                <TeamOutlined style={{ color: "#00334e" }} /> Contributors:
              </b>{" "}
              {props.project.contributors}
            </div>
            <div>
              <b>
                <ExclamationCircleOutlined style={{ color: "red" }} /> Open
                Issues:
              </b>{" "}
              {props.project.open_issues}
            </div>
            <div>
              <b>
                <PullRequestOutlined style={{ color: "green" }} /> Total
                Commits:
              </b>{" "}
              {props.project.total_commits}
            </div>
          </Col>
          <Collapse ghost>
            <Panel header={<b>More details</b>} key={1}>
              <Row className="Stats">
                <Col span={12} className="Stats-activity">
                  <div>
                    <b>
                      <EyeOutlined style={{ color: "#00334e" }} /> Watchers:
                    </b>{" "}
                    {props.project.watchers}
                  </div>
                  <div>
                    <b>
                      <StarOutlined style={{ color: "#00334e" }} /> Stargazers:
                    </b>{" "}
                    {props.project.stargazers}
                  </div>
                  <div>
                    <b>
                      <ForkOutlined style={{ color: "#00334e" }} /> Forks:
                    </b>{" "}
                    {props.project.forks}
                  </div>
                </Col>
                <Col span={12} className="Stats-dates">
                  <div>
                    <b>Pushed:</b>{" "}
                    {new Date(props.project.pushed).toLocaleDateString()}
                  </div>
                  <div>
                    <b>Created:</b>{" "}
                    {new Date(props.project.created).toLocaleDateString()}
                  </div>
                  <div>
                    <b>Updated:</b>{" "}
                    {new Date(props.project.updated).toLocaleDateString()}
                  </div>
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
