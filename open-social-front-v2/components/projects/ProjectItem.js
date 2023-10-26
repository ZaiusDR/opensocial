import Image from "next/image"

import mappings from "@/components/projects/TopicMappings"
import Chart from "@/components/charts/Chart"
import ProjectRating from "@/components/projects/ProjectRating"
import ProjectStats from "@/components/projects/ProjectStats"
import Link from "next/link"

const ProjectItem = (props) => {
  return(
    <div className="card shadow-xl overflow-hidden">
      <figure>
        <div className="relative">
          <Image className="object-cover" src={mappings[props.projectData.topic]} alt={props.projectData.topic} width={600} height={400} priority />
          <h1 className="absolute text-center text-5xl text-white font-extrabold p-1 capitalize top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-transparent/40">
            {props.projectData.topic}
          </h1>
        </div>
      </figure>
      <div className="card-body items-center">
        <Link className="card-title link" href={props.projectData.project_url} target="_blank">
          {props.projectData.project_name}
        </Link>
        <ProjectRating id={props.projectData.full_name} rating={props.projectData.rate}/>
        <p className="font-bold">{props.projectData.language}</p>
        <ProjectStats
          commits={props.projectData.total_commits}
          stargazers={props.projectData.stargazers}
          contributors={props.projectData.contributors}
        />
        <div className="divider m-1" />
        <p>{props.projectData.description}</p>
        <Chart data={props.projectData.commits_graph_data}/>
      </div>
    </div>
  )
}

export default ProjectItem
