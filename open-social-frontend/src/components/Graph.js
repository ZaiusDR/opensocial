import React from "react"

import { Line } from '@ant-design/charts';

import "../styles/Graph.css"


const Graph = (props) => {
  return (
    <Line
      data-testid="Graph"
      className="Graph"
      data={props.data}
      xField="month"
      yField="commits"
      xAxis={{ tickCount: 6 }}
      height={200}
      padding="auto"
      smooth={true}
    />
  )
}

export default Graph
