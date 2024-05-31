import { useState } from "react"
import ResultsList from "@/components/search/ResultsList"

const SearchBar = () => {
  const fakeResults = [
    {id: 1, value: "Intersectional feminism project, blabla"},
    {id: 2, value: "Incel culture study and anti-feminism negative impact"}
  ]

  const [onFocus, setOnFocus] = useState("w-42")
  const [query, setQuery] = useState('');

  const handleOnFocus = () => {
    setOnFocus("w-96")
  }

  const handleOnBlur = () => {
    setOnFocus("w-42")
  }

  const handleSearch = (event) => {
    setQuery(event.target.value)

    // implement logic here
  }

  return (
    <div>
      <label className="input input-bordered input-primary flex items-center gap-2">
        <input type="text"
               className={`grow ${onFocus}`}
               onFocus={handleOnFocus}
               onBlur={handleOnBlur}
               value={query}
               onChange={handleSearch}
               placeholder="Search" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
          <path fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
        </svg>
      </label>
      {query.length > 2 ? <ResultsList results={fakeResults} /> : null}

    </div>
  )
}

export default SearchBar
