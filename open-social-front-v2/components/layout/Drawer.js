import { useState } from "react"

import NavBar from "@/components/layout/NavBar"
import Logo from "@/components/layout/Logo"
import ProjectsList from "@/components/projects/ProjectsList"
import FiltersCollapse from "@/components/filters/FiltersCollapse"


const sortedByOptions = [
  {
    label: "None",
    value: "",
  },
  {
    label: "Contributors Number",
    value: "contributors",
  },
  {
    label: "Project Rate",
    value: "rate",
  },
  {
    label: "Total Commits",
    value: "total_commits",
  },
]


const Drawer = () => {
  const [sortedBy, setSortedBy] = useState("")

  const handleOnSelectSortedBy = (event) => {
    setSortedBy(event.target.value)
  }

  return(
    <div className="bg-base-100 drawer drawer-mobile max-lg:drawer-end">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar />
        <ProjectsList sortedBy={sortedBy} />
      </div>
      <div className="drawer-side">
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <aside className="menu bg-base-200 w-80">
          <div className="flex h-16 items-center justify-center shadow-sm shadow-gray-300 z-30">
            <Logo visible="max-lg:hidden" />
          </div>
          <ul className="menu mb-0 w-80 bg-base-200 text-base-content">
            <FiltersCollapse
              onSelect={handleOnSelectSortedBy}
              sortedByOptions={sortedByOptions}
            />
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default Drawer
