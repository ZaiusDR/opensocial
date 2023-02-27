import Image from "next/image"

const ProjectItem = (props) => {
  return(
    <div className="card shadow-xl overflow-hidden">
      {/*<figure><Image className="object-cover" src={props.imageUrl} alt="Shoes" width={600} height={400} priority /></figure>*/}
      <div className="card-body items-center">
        <h2 className="card-title">{props.projectData.project_name}</h2>
        <p>{props.projectData.project_name}</p>
      </div>
    </div>
  )
}

export default ProjectItem
