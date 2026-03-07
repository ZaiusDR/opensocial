import { useState, useEffect, useRef } from "react"
import ResultsList from "@/components/search/ResultsList"
import SearchIcon from "@/components/search/SearchIcon"

import useSWR from "swr"

const fetcher = url => fetch(url).then(r => r.json())

const SearchBar = ({ onSearchOpen, onSearch }) => {
  const [onFocus, setOnFocus] = useState("max-lg:w-42")
  const [query, setQuery] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef(null)

  // Debounce: call onSearch 300ms after query settles
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) onSearch(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  // Outside click: close dropdown
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleMouseDown)
    return () => document.removeEventListener("mousedown", handleMouseDown)
  }, [])

  const swrKey = query.length > 0 ? `https://api.open-social.net/autocomplete?query=${query}` : null
  const { data } = useSWR(swrKey, fetcher)

  const handleOnFocus = () => {
    setOnFocus("lg:w-96 max-lg:w-64")
    if (data && data.length > 0) setShowDropdown(true)
  }

  const handleOnBlur = () => {
    if (query.length === 0) setOnFocus("lg:w-42")
  }

  const handleSearch = (event) => {
    setQuery(event.target.value)
    setShowDropdown(true)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (onSearch) onSearch(query)
      setShowDropdown(false)
    } else if (event.key === "Escape") {
      setQuery("")
      setShowDropdown(false)
      if (onSearch) onSearch("")
    }
  }

  const handleSelect = (description) => {
    setQuery(description)
    setShowDropdown(false)
    if (onSearch) onSearch(description)
  }

  const shouldShowDropdown = showDropdown && data && data.length > 0 && query.length > 0

  return (
    <div ref={containerRef}>
      <label className={`input input-bordered input-primary flex items-center gap-2 bg-base-200/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all ${onSearchOpen ? null : "max-lg:hidden"}`}>
        <input type="text"
               className={`grow ${onFocus}`}
               onFocus={handleOnFocus}
               onBlur={handleOnBlur}
               onKeyDown={handleKeyDown}
               value={query}
               onChange={handleSearch}
               placeholder="Search projects..." />
        <SearchIcon />
      </label>
      {shouldShowDropdown ? <ResultsList results={data} onSelect={handleSelect} /> : null}
    </div>
  )
}

export default SearchBar
