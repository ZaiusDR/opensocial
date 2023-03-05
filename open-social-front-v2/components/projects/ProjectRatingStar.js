const ProjectRatingStar = (props) => {
  return (
    <input
      type="radio"
      name={`rating-${props.name}`}
      disabled
      className={`bg-primary mask mask-star-2 ${props.classType}`}
      {...props.isChecked}
    />
  )
}

export default ProjectRatingStar
