const ResultsList = (props) => {
  return(
    <ul className="absolute left-6 right-0 mt-1 bg-white border border-primary rounded-md shadow-lg z-10 animate-fade">
      {props.results.length > 0 ?
        props.results.map(result =>
          <li key={result._id} className="px-4 py-2 cursor-pointer hover:bg-gray-100">{result.description}</li>)
        :
        <span className="loading loading-spinner loading-md text-primary"></span>
      }
    </ul>
  )
}

export default ResultsList
