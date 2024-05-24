import useSWR from "swr"

const TopicsSelect = (props) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR('https://api.open-social.net/topics', fetcher)

  return (
    <div className="form-control w-full max-w-xs font-bold">
      <label className="label">
        <span>Topics</span>
      </label>
      <select className="select select-bordered w-full max-w-xs" onChange={props.onSelect} >
        {isLoading ? null : data.map(topic =>
          <option key={topic} label={topic.charAt(0).toUpperCase() + topic.slice(1)} value={topic} />
        )}
      </select>
    </div>
  )
}

export default TopicsSelect
