import React from "react"
import loadable from "@loadable/component"

import { BackTop, Spin } from "antd"
import { InView } from "react-intersection-observer"

const InfiniteScroll = loadable(() => import("react-infinite-scroll-component"))
const Project = loadable(() => import("./Project"))

const ProjectsList = (props) => {
  return (
    <InView as="div" threshold={1} onChange={props.onChangeInView}>
    <InfiniteScroll
      className="ProjectsContainer"
      dataLength={props.projects.length}
      next={props.fetchData}
      hasMore={props.hasMore}
      loader={
        <Spin
          size="large"
        />
      }
    >
      {props.projectsHaveBeenVisible ? (
        props.projects.map((project) => (
          <Project key={project.full_name} project={project} />
        ))
      ) : null}
      <BackTop />
    </InfiniteScroll>
    </InView>
  )
}

export default ProjectsList
