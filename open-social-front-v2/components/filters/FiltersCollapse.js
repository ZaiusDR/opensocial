import { useState } from "react"

import Image from "next/image"

import SortedSelect from "@/components/filters/SortedSelect"
import filterIcon from "@/public/filters.svg"
import TopicsSelect from "@/components/filters/TopicsSelect"


const FiltersCollapse = (props) => {
  const [collapseOpen, setCollapseOpen] = useState(false)

  const handleOnClickCollapse = (event) => {
    if (event.target.className.includes('collapse-title')) {
      setCollapseOpen(prevState => !prevState)
    }
  }

  return (
    <div
      className={`collapse collapse-arrow collapse-${collapseOpen ? "open" : "close"} border
                  border-base-300 bg-primary rounded-box my-6 px-2 hover:bg-primary-focus/100 cursor-pointer`}
      onClick={handleOnClickCollapse}
    >
      <div className="flex collapse-title text-xl font-medium">
        <Image className="mr-1" src={filterIcon} width={14} height={14} alt="Filter Icon" />Filters
      </div>
      <div className="collapse-content cursor-auto">
        <SortedSelect onSelect={props.onSelectSortedBy} sortedByOptions={props.sortedByOptions}/>
        <TopicsSelect onSelect={props.onSelectTopic} topics={props.topics} />
      </div>
    </div>
  )
}

export default FiltersCollapse
