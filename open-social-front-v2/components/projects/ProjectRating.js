const ProjectRating = (props) => {
  return(
    <div className="rating rating-half">
      {Array.apply(0, Array(10)).map(function (x, i) {
        const isChecked = props.rating >= (i + 1) / 10 && props.rating < (i + 2) / 10 ? { defaultChecked : true } : { defaultChecked : false }

        return <input
          key={i}
          type="radio"
          name={`rating-${props.id}`}
          disabled
          className={`rating-half mask mask-star-2 bg-primary mask-half-${i % 2 + 1}`}
          {...isChecked}
        />;
      })}
    </div>
  )
}

export default ProjectRating
