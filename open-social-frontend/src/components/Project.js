import React from "react";

import loadable from "@loadable/component";
import { Row, Col } from "antd";

import 'antd/dist/antd.css';
import "../styles/Project.css";

const ProjectGraph = loadable(() => import("./ProjectGraph.js"));


function Project(props) {
  return (
    <li key={props.project.full_name} className="Project-item">
      <Row>
        <Col span={24} className="Project" align='middle'>
          <Row align={'middle'}>
            <Col span={21} className="Project-name">
              <a href={props.project.project_url}><b>{props.project.project_name}</b></a>
            </Col>
            <Col span={3} style={{ backgroundColor: props.project.rate >= 0.6 ? '#90D97A': '#F9F871', textAlign: 'center'}}>
                <b>Rate:</b> {props.project.rate}
            </Col>
          </Row>
          <Col span={24} className="Project-details">
            <div><b>Full Name:</b> {props.project.full_name}</div>
            <div><b>Description:</b> {props.project.description}</div>
            <div><b>Language:</b> {props.project.language ? props.project.language : 'N/A'}</div>
          </Col>
          <Row className="Stats">
            <Col span={12} className="Stats-activity">
              <div><b>Contributors:</b> {props.project.contributors}</div>
              <div><b>Open Issues:</b> {props.project.open_issues}</div>
              <div><b>Total Commits:</b> {props.project.total_commits}</div>
              <div><b>Watchers:</b> {props.project.watchers}</div>
              <div><b>Stargazers:</b> {props.project.stargazers}</div>
              <div><b>Forks:</b> {props.project.forks}</div>
            </Col>
            <Col span={12} className="Stats-dates">
              <div><b>Pushed:</b> {new Date(props.project.pushed).toLocaleDateString()}</div>
              <div><b>Created:</b> {new Date(props.project.created).toLocaleDateString()}</div>
              <div><b>Updated:</b> {new Date(props.project.updated).toLocaleDateString()}</div>
            </Col>
          </Row>
          <Col span={24} className="Graph-data">
            <div><b>Recent Commits Activity:</b></div>
            <ProjectGraph data={props.project.commits_graph_data}/>
          </Col>
        </Col>
      </Row>
    </li>
  )
}

export default Project;

