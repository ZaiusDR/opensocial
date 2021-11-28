import React from "react"

import { Line } from '@ant-design/charts';


const Graph = (props) => {
  return (
    <Line
      data-testid="Graph"
      data={props.data}
      xField="month"
      yField="commits"
      height={200}
      padding="auto"
      smooth={true}
    />
  )
}

export default Graph
