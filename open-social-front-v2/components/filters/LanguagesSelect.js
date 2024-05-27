import useSWR from "swr"

const LanguagesSelect = (props) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR('https://api.open-social.net/languages', fetcher)

  return (
    <div className="form-control w-full max-w-xs font-bold">
      <label className="label">
        <span>Languages</span>
      </label>
      <select className="select select-bordered w-full max-w-xs" onChange={props.onSelect}>
        <option disabled selected key={"none"} label={"None"} value={"none"} />
        {isLoading ? null : data.sort().map(language =>
          <option key={language} label={language} value={language} />
        )}
      </select>
    </div>
  )
}

export default LanguagesSelect
