import React from "react";

import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import handleViewport from "react-in-viewport";


const Graph = (props) => {
  return props.inViewport || props.enterCount >= 1 ?
    <ResponsiveContainer className="Graph-container" width="100%" height={200} ref={props.forwardedRef}>
      <AreaChart
        test-id='CommitGraph'
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
            <stop offset="60%" stopColor="#00334E" stopOpacity={1}/>
            <stop offset="100%" stopColor="#000000" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area isAnimationActive={false} type="monotone" dataKey={"commits"} stroke={"#00334E"} fill="url(#colorUv)"/>
      </AreaChart>
    </ResponsiveContainer>
    :
    <div style={{height: 200}} ref={props.forwardedRef}/>
};

const ViewportGraph = handleViewport(Graph);

function ProjectGraph(props) {
  return <ViewportGraph data={props.data} />
}

export default ProjectGraph
