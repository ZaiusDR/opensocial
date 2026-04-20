import Image from "next/image"

import mappings, { topicColors } from "@/components/projects/TopicMappings"
import Chart from "@/components/charts/Chart"
import ProjectRating from "@/components/projects/ProjectRating"
import ProjectStats from "@/components/projects/ProjectStats"
import Link from "next/link"

const ProjectItem = (props) => {
  const colors = topicColors[props.projectData.topic] || { bg: 'bg-gray-100', text: 'text-gray-800' }

  return(
    <div className="card shadow-xl overflow-hidden animate-fade border border-base-300/50 card-hover">
      <div className="h-1 gradient-card-accent" />
      <figure>
        <div className="relative w-full">
          <Image className="object-cover" src={mappings[props.projectData.topic]} alt={props.projectData.topic} width={600} height={400} priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} capitalize`}>
            {props.projectData.topic}
          </span>
          {props.projectData.language && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30">
              {props.projectData.language}
            </span>
          )}
        </div>
      </figure>
      <div className="card-body items-center">
        <Link className="card-title link" href={props.projectData.project_url} target="_blank">
          {props.projectData.project_name}
        </Link>
        <ProjectRating id={props.projectData.full_name} rating={props.projectData.rate}/>
        <ProjectStats
          commits={props.projectData.total_commits}
          stargazers={props.projectData.stargazers}
          contributors={props.projectData.contributors}
        />
        <div className="divider m-1" />
        <p className="line-clamp-3">{props.projectData.description}</p>
        <Chart data={props.projectData.commits_graph_data}/>
      </div>
    </div>
  )
}

export default ProjectItem
