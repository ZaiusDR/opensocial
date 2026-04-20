import useSWR from "swr"

const TopicsSelect = (props) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR('https://api.open-social.net/topics', fetcher)

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60">Topics</span>
      </label>
      <select className="select select-bordered select-sm w-full" defaultValue={"none"} onChange={props.onSelect} >
        <option disabled key={"none"} label={"None"} value={"none"} />
        {isLoading ? null : data.map(topic =>
          <option key={topic} label={topic.charAt(0).toUpperCase() + topic.slice(1)} value={topic} />
        )}
      </select>
    </div>
  )
}

export default TopicsSelect
