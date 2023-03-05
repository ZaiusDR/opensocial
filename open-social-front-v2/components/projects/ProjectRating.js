import ProjectRatingStar from "@/components/projects/ProjectRatingStar"

const ProjectRating = (props) => {
  return(
    <div className="rating rating-half">
      {Array.apply(0, Array(10)).map((x, i) => {
        const isChecked = props.rating >= (i + 1) / 10 && props.rating < (i + 2) / 10 ? { defaultChecked : true } : { defaultChecked : false }

        return <ProjectRatingStar
          key={i}
          id={`rating-${props.id}`}
          index={i}
          classType={`mask-half-${(i % 2) + 1}`}
          isChecked={isChecked}
        />;
      })}
    </div>
  )
}

export default ProjectRating
