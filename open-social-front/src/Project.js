import React from "react";
import "./Project.css";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import moment from "moment";

function Project(props) {

  const commits = props.project.last_commit_dates;

  function getXAxisDate(month) {
    return moment().subtract(month, 'months').format('YYYY-MM')
  }

  function getCommitsNumberByMonth(last_commits, month) {
    return last_commits.filter(date => date.toString().includes(month)).length
  }

  const data = [
    {name: getXAxisDate(5), commits: getCommitsNumberByMonth(commits, getXAxisDate(5))},
    {name: getXAxisDate(4), commits: getCommitsNumberByMonth(commits, getXAxisDate(4))},
    {name: getXAxisDate(3), commits: getCommitsNumberByMonth(commits, getXAxisDate(3))},
    {name: getXAxisDate(2), commits: getCommitsNumberByMonth(commits, getXAxisDate(2))},
    {name: getXAxisDate(1), commits: getCommitsNumberByMonth(commits, getXAxisDate(1))},
    {name: getXAxisDate(0), commits: getCommitsNumberByMonth(commits, getXAxisDate(0))},
  ];

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
        <div>Created: {moment(props.project.created).format('YYYY-MM-DD')}</div>
        <div>Updated: {moment(props.project.updated).format('YYYY-MM-DD')}</div>
        <div>Forks: {props.project.forks}</div>
        <div>Language: {props.project.language ? props.project.language : 'N/A'}</div>
        <div>Archived: {props.project.archived ? 'Yes' : 'No'}</div>
        <div>Recent Commits Activity: </div>
        <ResponsiveContainer width="90%" height={200}>
          <AreaChart
            test-id='CommitGraph'
            width={600}
            height={300}
            data={data}
            margin={{
              top: 30,
              right: 70,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Area type="monotone" dataKey={"commits"} stroke={"#75689c"} fill={"#b8a2fa"}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </li>
  )
}

export default Project;

