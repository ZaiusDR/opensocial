import { useState } from "react"
import ResultsList from "@/components/search/ResultsList"
import SearchIcon from "@/components/search/SearchIcon"

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
    if (query.length === 0) setOnFocus("w-42")
  }

  const handleSearch = (event) => {
    setQuery(event.target.value)

    // implement logic here
  }

  return (
    <div>
      <label className="input input-bordered input-primary flex items-center gap-2 max-lg:hidden">
        <input type="text"
               className={`grow ${onFocus}`}
               onFocus={handleOnFocus}
               onBlur={handleOnBlur}
               value={query}
               onChange={handleSearch}
               placeholder="Search" />
        <SearchIcon />
      </label>
      {query.length > 2 ? <ResultsList results={fakeResults} /> : null}

    </div>
  )
}

export default SearchBar
