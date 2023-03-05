const ProjectRating = (props) => {
  const getIsChecked = (rating, index) => {
    return rating >= (index + 1) / 10 && rating < (index + 2) / 10 ? { defaultChecked : true } : { defaultChecked : false }
  }

  const getHalfType = (index) => {
    return `mask-half-${(index % 2) + 1}`
  }

  return(
    <div className="rating rating-half">
      {Array.apply(0, Array(10)).map(function (x, i) {
        return <input
          key={i}
          type="radio"
          name={`rating-${props.id}`}
          disabled
          className={`bg-primary mask mask-star-2 ${getHalfType(i)}`}
          {...getIsChecked(props.rating, i)}
        />;
      })}
    </div>
  )
}

export default ProjectRating
