import React from "react"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"


const Graph = (props) => {
  return (
    <div data-testid="Graph" className="Graph">
      <ResponsiveContainer
        className="Graph-container"
        width="100%"
        height={200}
        ref={props.forwardedRef}
      >
        <AreaChart
          width={600}
          height={200}
          data={props.data}
          margin={{
            top: 30,
            right: 70,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" color={"gray"}/>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey={"commits"}
            stroke={"#00334E"}
            fill={"#00334E"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph
