import Image from "next/image"

const ProjectStatItem = (props) => {
  return (
    <div className="tooltip flex w-full items-center justify-center mt-2" data-tip={props.tooltip}>
      <Image className="mr-4" src={props.image} alt={props.alt} width={20} height={20} />
      <span>{props.data}</span>
    </div>
  )
}

export default ProjectStatItem
