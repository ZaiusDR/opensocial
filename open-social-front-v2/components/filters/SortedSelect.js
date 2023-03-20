const SortedSelect = (props) => {
  return (
    <div className="form-control w-full max-w-xs font-bold">
      <label className="label">
        <span>Sorted By</span>
      </label>
      <select className="select select-bordered w-full max-w-xs" onChange={props.onSelect} >
        {props.sortedByOptions.map(option =>
          <option key={option.value} label={option.label} value={option.value} />
        )}
      </select>
    </div>
  )
}

export default SortedSelect
