import Image from "next/image"

import mappings from "@/components/projects/TopicMappings"
import Chart from "@/components/charts/Chart"

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
        <h2 className="card-title">{props.projectData.project_name}</h2>
        <p>{props.projectData.language}</p>
        <p>{props.projectData.description}</p>
        <Chart data={props.projectData.commits_graph_data}/>
      </div>
    </div>
  )
}

export default ProjectItem
