import Image from "next/image"

const ProjectItem = (props) => {
  const imageUrl = "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=640&q=75"
  return(
    <div className="card shadow-xl overflow-hidden">
      <figure><Image className="object-cover" src={imageUrl} alt="Shoes" width={600} height={400} priority /></figure>
      <div className="card-body items-center">
        <h2 className="card-title">{props.projectData.project_name}</h2>
        <p>{props.projectData.language}</p>
        <p>{props.projectData.description}</p>
      </div>
    </div>
  )
}

export default ProjectItem
