import useSWR from "swr"

const LanguagesSelect = (props) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const { data, error, isLoading } = useSWR('https://api.open-social.net/languages', fetcher)

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="text-xs font-semibold uppercase tracking-wider text-base-content/60">Languages</span>
      </label>
      <select className="select select-bordered select-sm w-full" defaultValue={"none"} onChange={props.onSelect}>
        <option disabled key={"none"} label={"None"} value={"none"} />
        {isLoading ? null : data.sort().map(language =>
          <option key={language} label={language} value={language} />
        )}
      </select>
    </div>
  )
}

export default LanguagesSelect
