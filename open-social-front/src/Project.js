import React from "react";

function Project(props) {
  return (
    <li key={props.project.full_name}>
      {props.project.full_name} - {props.project.project_name}
    </li>
  )
}

export default Project;

