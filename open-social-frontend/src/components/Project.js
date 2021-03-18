import React from "react";

import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import { Row, Col } from "antd";

import 'antd/dist/antd.css';
import "../styles/Project.css";


function Project(props) {
  return (
    <li key={props.project.full_name} className="Project-item">
      <Row>
        <Col span={24} className="Project">
          <div className="Project-name">
            <a href={props.project.project_url}><b>{props.project.project_name}</b></a>
          </div>
          <div className="Project-details">
            <div><b>Full Name:</b> {props.project.full_name}</div>
            <div><b>Description:</b> {props.project.description}</div>
            <div><b>Language:</b> {props.project.language ? props.project.language : 'N/A'}</div>
          </div>
          <div className="Stats">
            <div className="Stats-activity">
              <div><b>Contributors:</b> {props.project.contributors}</div>
              <div><b>Open Issues:</b> {props.project.open_issues}</div>
              <div><b>Total Commits:</b> {props.project.total_commits}</div>
              <div><b>Watchers:</b> {props.project.watchers}</div>
              <div><b>Stargazers:</b> {props.project.stargazers}</div>
              <div><b>Forks:</b> {props.project.forks}</div>
            </div>
            <div className="Stats-dates">
              <div><b>Pushed:</b> {new Date(props.project.pushed).toLocaleDateString()}</div>
              <div><b>Created:</b> {new Date(props.project.created).toLocaleDateString()}</div>
              <div><b>Updated:</b> {new Date(props.project.updated).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="Graph-data">
            <div><b>Recent Commits Activity:</b></div>
            <ResponsiveContainer className={"graphContainer"} width="100%" height={200}>
              <AreaChart
                test-id='CommitGraph'
                width={600}
                height={200}
                data={props.project.commits_graph_data}
                margin={{
                  top: 30,
                  right: 70,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey={"commits"} stroke={"#001529"} fill={"#365d8c"}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>
    </li>
  )
}

export default Project;

