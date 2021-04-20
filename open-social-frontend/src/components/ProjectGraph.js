import React from "react"

import handleViewport from "react-in-viewport"

import Graph from "./Graph"


const ViewportGraph = handleViewport(Graph)

export default function ProjectGraph(props) {
  return <ViewportGraph data={props.data} />
}
