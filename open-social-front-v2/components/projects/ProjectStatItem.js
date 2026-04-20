import Image from "next/image"

const ProjectStatItem = (props) => {
  return (
    <div className="tooltip flex w-full items-center justify-center mt-2" data-tip={props.tooltip}>
      <Image className="mr-4 opacity-60 [[data-theme=opensocial-dark]_&]:invert" src={props.image} alt={props.alt} width={20} height={20} />
      <span className="text-sm font-semibold text-base-content/80">{props.data}</span>
    </div>
  )
}

export default ProjectStatItem
