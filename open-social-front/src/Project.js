import React from "react";
import "./Project.css"

function Project(props) {
  return (
    <li key={props.project.full_name} className="Project-item">
      <div className="Project">
        <div>
          <a href={props.project.project_url}>{props.project.project_name}</a>
        </div>
        <div>Full Name: {props.project.full_name}</div>
        <div>Stargazers: {props.project.stargazers}</div>
        <div>Watchers: {props.project.watchers}</div>
        <div>Created: {props.project.created}</div>
        <div>Updated: {props.project.updated}</div>
      </div>
    </li>
  )
}

export default Project;

