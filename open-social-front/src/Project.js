import React from "react";
import "./Project.css";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import moment from "moment";

function Project(props) {
  return (
    <li key={props.project.full_name} className="Project-item">
      <div className="Project">
        <div>
          <a href={props.project.project_url}>{props.project.project_name}</a>
        </div>
        <div>Full Name: {props.project.full_name}</div>
        <div>Description: {props.project.description}</div>
        <div>Open Issues: {props.project.open_issues}</div>
        <div>Total Commits: {props.project.total_commits}</div>
        <div>Watchers: {props.project.watchers}</div>
        <div>Stargazers: {props.project.stargazers}</div>
        <div>Pushed: {moment(props.project.pushed).format('YYYY-MM-DD')}</div>
        <div>Created: {moment(props.project.created).format('YYYY-MM-DD')}</div>
        <div>Updated: {moment(props.project.updated).format('YYYY-MM-DD')}</div>
        <div>Forks: {props.project.forks}</div>
        <div>Language: {props.project.language ? props.project.language : 'N/A'}</div>
        <div>Archived: {props.project.archived ? 'Yes' : 'No'}</div>
        <div>Recent Commits Activity: </div>
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
            <Area type="monotone" dataKey={"commits"} stroke={"#75689c"} fill={"#b8a2fa"}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </li>
  )
}

export default Project;

