const LoadMoreButton = (props) => {
  return(
    <div className="flex w-full justify-center pb-8">
      <button className="btn btn-primary uppercase" onClick={props.onClick}>Load More</button>
    </div>
  )
}

export default LoadMoreButton
