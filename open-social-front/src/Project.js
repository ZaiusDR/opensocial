import React from "react";
import "./Project.css";
import {Line, CartesianGrid, XAxis, YAxis, AreaChart} from 'recharts';

function Project(props) {
  const data = [
    {name: '2020-01', uv: 4, pv: 5, amt: 2400},
    {name: '2020-02', uv: 7, pv: 8, amt: 3400},
    {name: '2020-03', uv: 4, pv: 5, amt: 8400},
  ];
  // const data = props.project.last_commit_dates.map(commit_date =>{
  //   commit
  // })
  return (
    <li key={props.project.full_name} className="Project-item">
      <div className="Project">
        <div>
          <a href={props.project.project_url}>{props.project.project_name}</a>
        </div>
        <div>Full Name: {props.project.full_name}</div>
        <div>Description: {props.project.description}</div>
        <div>Open Issues: {props.project.open_issues}</div>
        <div>Watchers: {props.project.watchers}</div>
        <div>Created: {props.project.created}</div>
        <div>Updated: {props.project.updated}</div>
        <div>Forks: {props.project.forks}</div>
        <div>Language: {props.project.language ? props.project.language : 'N/A'}</div>
        <div>Archived: {props.project.archived ? 'Yes' : 'No'}</div>
        <div>Last Commit Dates: {props.project.last_commit_dates}</div>
        <div><AreaChart test-id='CommitGraph' width={600} height={300} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </AreaChart></div>
      </div>
    </li>
  )
}

export default Project;

