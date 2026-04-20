import { useState } from "react"

import Image from "next/image"

import SortedSelect from "@/components/filters/SortedSelect"
import filterIcon from "@/public/filters.svg"
import TopicsSelect from "@/components/filters/TopicsSelect"
import LanguagesSelect from "@/components/filters/LanguagesSelect"


const FiltersCollapse = (props) => {
  const [collapseOpen, setCollapseOpen] = useState(true)

  const handleOnClickCollapse = (event) => {
    if (event.target.className.includes('collapse-title')) {
      setCollapseOpen(prevState => !prevState)
    }
  }

  return (
    <div
      className={`collapse collapse-arrow collapse-${collapseOpen ? "open" : "close"} border
                  border-base-300 bg-base-100 rounded-xl my-4 px-2 shadow-sm hover:border-primary/50 transition-colors cursor-pointer`}
      onClick={handleOnClickCollapse}
    >
      <div className="flex collapse-title text-xl font-medium text-base-content">
        <Image className="mr-1 [[data-theme=opensocial-dark]_&]:invert" src={filterIcon} width={14} height={14} alt="Filter Icon" />Filters
      </div>
      <div className="collapse-content cursor-auto">
        <SortedSelect onSelect={props.onSelectSortedBy} sortedByOptions={props.sortedByOptions} />
        <TopicsSelect onSelect={props.onSelectTopic} topics={props.topics} />
        <LanguagesSelect onSelect={props.onSelectLanguages} language={props.languages} />
      </div>
    </div>
  )
}

export default FiltersCollapse
