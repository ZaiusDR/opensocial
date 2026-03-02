const SortedSelect = (props) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60">Sorted By</span>
      </label>
      <select id="sortedBy" className="select select-bordered select-sm w-full" onChange={props.onSelect} >
        {props.sortedByOptions.map(option =>
          <option key={option.value} label={option.label} value={option.value} />
        )}
      </select>
    </div>
  )
}

export default SortedSelect
