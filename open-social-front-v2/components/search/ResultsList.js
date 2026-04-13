const ResultsList = ({ results, onSelect }) => {
  return(
    <ul role="listbox" className="absolute left-6 right-0 mt-1 bg-base-100 border border-base-300 rounded-xl shadow-lg z-10 animate-fade overflow-hidden">
      {results.length > 0 ?
        results.map(result =>
          <li key={result._id}
              role="option"
              className="px-4 py-2 cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => onSelect(result.description)}>
            {result.description}
          </li>)
        :
        <span className="loading loading-spinner loading-md text-primary"></span>
      }
    </ul>
  )
}

export default ResultsList
