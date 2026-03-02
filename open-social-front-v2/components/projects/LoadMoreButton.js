const LoadMoreButton = (props) => {
  return(
    <div className="flex w-full justify-center pb-8">
      <button
        className="btn uppercase gradient-btn shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all"
        onClick={props.onClick}
      >
        Load More
      </button>
    </div>
  )
}

export default LoadMoreButton
