import { useState } from "react"

import NavBar from "@/components/layout/NavBar"
import Logo from "@/components/layout/Logo"
import ProjectsList from "@/components/projects/ProjectsList"
import FiltersCollapse from "@/components/filters/FiltersCollapse"
import WhyOpenSocialMenuItem from "@/components/why/WhyOpenSocialMenuItem"


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
  const [topics, setTopics] = useState("")
  const [languages, setLanguages] = useState("")

  const handleOnSelectSortedBy = (event) => {
    setSortedBy(event.target.value)
  }

  const handleOnSelectTopics = (event) => {
    setTopics(event.target.value)
  }

  const handleOnSelectLanguages = (event) => {
    setLanguages(event.target.value)
  }

  return(
    <div className="bg-base-100 drawer max-lg:drawer-end lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar />
        <ProjectsList sortedBy={sortedBy} topics={topics} languages={languages}/>
      </div>
      <div className="drawer-side">
        <label htmlFor="drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="flex flex-col h-full w-80 gradient-sidebar">
          <div className="flex w-full h-16 items-center justify-center border-b border-base-300/50 z-30">
            <Logo visible="max-lg:hidden" />
          </div>
          <div className="flex-1 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-base-content/60 mb-2 px-2">Refine Results</h3>
            <FiltersCollapse
              onSelectSortedBy={handleOnSelectSortedBy}
              sortedByOptions={sortedByOptions}
              onSelectTopic={handleOnSelectTopics}
              topics={topics}
              onSelectLanguages={handleOnSelectLanguages}
              languages={languages}
            />
          </div>
          <div className="p-4 mt-auto">
            <WhyOpenSocialMenuItem />
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Drawer
