import React from "react"
import loadable from "@loadable/component"

import { BackTop } from "antd"
import { InView } from "react-intersection-observer"
import Spinner from "./Spinner"

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
        <Spinner />
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
