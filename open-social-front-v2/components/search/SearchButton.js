import SearchIcon from "@/components/search/SearchIcon"

const SearchButton = (props) => {
  return (
    <button onClick={props.onClick} hidden={props.searchOpen}>
      <SearchIcon />
    </button>
  )
}

export default SearchButton
