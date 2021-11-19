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
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="60%" stopColor="#00334E" stopOpacity={1} />
              <stop offset="100%" stopColor="#00334E" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            isAnimationActive={false}
            type="monotone"
            dataKey={"commits"}
            stroke={"#00334E"}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph
