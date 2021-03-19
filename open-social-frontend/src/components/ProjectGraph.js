import React from "react";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


function ProjectGraph(props) {
  return <ResponsiveContainer className={"graphContainer"} width="100%" height={200}>
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={"commits"} stroke={"#001529"} fill={"#365d8c"}/>
      </AreaChart>
    </ResponsiveContainer>
}

export default ProjectGraph
