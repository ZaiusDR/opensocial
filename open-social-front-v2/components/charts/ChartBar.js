const ChartBar = (props) => {
  const date = new Date(props.dataPoint.month);
  const shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format
  const barHeight = Math.round((props.dataPoint.commits * 100) / props.max) + "%"
  const number = props.dataPoint.commits > 0 ? props.dataPoint.commits : ""

  return (
    <div className="relative flex flex-col items-center flex-grow h-36 pb-5">
      <div className="relative flex flex-col justify-end w-full h-full flex-grow items-center">
        <div className={`flex flex-col w-full gradient-card-accent justify-center items-center rounded-t text-white text-sm font-semibold`} style={{ height: barHeight}}>{number}</div>
      </div>
      <span className="absolute bottom-0 text-xs font-bold">
        {shortMonthName(date)}
      </span>
    </div>
  )
}

export default ChartBar
