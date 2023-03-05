import { useState } from "react"

import Image from "next/image"

import SortedSelect from "@/components/filters/SortedSelect"
import filterIcon from "@/public/filters.svg"


const FiltersCollapse = (props) => {
  const [collapseOpen, setCollapseOpen] = useState(false)

  const handleOnClickCollapse = (event) => {
    if (event.target.className.includes('collapse-title')) {
      setCollapseOpen(prevState => !prevState)
    }
  }

  return (
    <div
      className={`collapse collapse-arrow collapse-${collapseOpen ? "open" : "close"}
                  border border-base-300 bg-primary rounded-box my-6 mx-4 hover:bg-primary-focus/100 cursor-pointer`}
      onClick={handleOnClickCollapse}
    >
      <div className="flex collapse-title text-xl font-medium">
        <Image className="mr-1" src={filterIcon} width={14} height={14} alt="Filter Ucon" />Filters
      </div>
      <div className="collapse-content cursor-auto">
        <SortedSelect onSelect={props.onSelect} sortedByOptions={props.sortedByOptions}/>
      </div>
    </div>
  )
}

export default FiltersCollapse
