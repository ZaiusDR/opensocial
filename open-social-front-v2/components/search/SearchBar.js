import { useState } from "react"
import ResultsList from "@/components/search/ResultsList"
import SearchIcon from "@/components/search/SearchIcon"

import useSWR from "swr"

const fetcher = url => fetch(url).then(r => r.json())

const SearchBar = (props) => {
  const [onFocus, setOnFocus] = useState("max-lg:w-42")
  const [query, setQuery] = useState("");

  const { data, error } = useSWR(`https://api.open-social.net/autocomplete?query=${query}`, fetcher)

  const handleOnFocus = () => {
    setOnFocus("lg:w-96 max-lg:w-64")
  }

  const handleOnBlur = () => {
    if (query.length === 0) setOnFocus("lg:w-42")
  }

  const handleSearch = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <label className={`input input-bordered input-primary flex items-center gap-2 ${props.onSearchOpen ? null : "max-lg:hidden"}`}>
        <input type="text"
               className={`grow ${onFocus}`}
               onFocus={handleOnFocus}
               onBlur={handleOnBlur}
               value={query}
               onChange={handleSearch}
               placeholder="Search" />
        <SearchIcon />
      </label>
      {data && data.length > 0 ? <ResultsList results={data} /> : null}
    </div>
  )
}

export default SearchBar
