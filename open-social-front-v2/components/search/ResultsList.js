const ResultsList = (props) => {
  return(
    <ul className="absolute left-6 right-0 mt-1 bg-white border border-primary rounded-md shadow-lg z-10 animate-fade">
      {props.results.length > 0 ?
        props.results.map(result => <li key={result.id}>{result.value}</li>)
        :
        <span className="loading loading-spinner loading-md text-primary"></span>
      }
    </ul>
  )
}

export default ResultsList
