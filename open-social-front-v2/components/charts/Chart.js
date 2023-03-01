import ChartBar from "@/components/charts/ChartBar"
import { useEffect, useState } from "react"

const Chart = (props) => {
  const [max, setMax] = useState(0)

  useEffect(() => {
    setMax(Math.max(...props.data.map(item => item.commits)))
  })

  return (
    <div className="flex flex-col items-center w-full max-w-screen-md p-6 pb-6 bg-white rounded-lg shadow-sm sm:p-8">
      <h2 className="text-xl font-bold">Monthly Commits</h2>
      <span className="text-sm font-semibold text-gray-500">Last six months</span>
      <div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
        {props.data.map(dataPoint =>
          <ChartBar key={dataPoint.month} dataPoint={dataPoint} max={max} />
        )}
      </div>
    </div>
  )
}

export default Chart
