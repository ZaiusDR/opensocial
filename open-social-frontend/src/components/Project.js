import React from "react"

import loadable from "@loadable/component"

import { Typography, Row, Col, Rate, Collapse, Divider, Avatar, Image, Card } from "antd"
import {
  EyeOutlined,
  ExclamationCircleOutlined,
  ForkOutlined,
  PullRequestOutlined,
  TeamOutlined,
  StarOutlined,
} from "@ant-design/icons"

import "../styles/Project.css"

const ProjectGraph = loadable(() => import("./Graph"))

const { Panel } = Collapse
const { Link } = Typography


function Project(props) {
  return (
    <li data-testid="Project" key={props.project.full_name} className="Project-item">
      <Card className="Project">
          <Row align={"middle"} wrap={false}>
            <Col flex="none">
              <Avatar
                size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40 }}
                src={
                  <Image
                    alt="Avatar"
                    src={props.project.avatar_url}
                    preview={false}
                  />
              }
              />
            </Col>
            <Col flex="auto" className="Project-name">
              <Link href={props.project.project_url} target="_blank" rel="noreferrer">
                {props.project.project_name}
              </Link>
            </Col>
          </Row>
          <Row className="Project-details">
            <Col span={16} xs={24} md={16}>
              <b>Project Rate: </b>
              <Rate
                className="Project-rate"
                disabled
                allowHalf
                defaultValue={(props.project.rate * 10) / 2}
                character={<span className="icon-unicorn_rate" />}
              /><br/>
              <b>Homepage: </b><Link href={props.project.homepage} target="_blank">{props.project.homepage}</Link><br/>
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
          <Row className="Project-details">
            <Col>
              <b>Description:</b> {props.project.description}<br/>
            </Col>
          </Row>
          <Divider />
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
          <Row>
            <Col span={24} className="Graph-title">
              <b>Recent Commits Activity:</b>
            </Col>
          </Row>
          <ProjectGraph data={props.project.commits_graph_data} />
      </Card>
    </li>
  )
}

export default Project
