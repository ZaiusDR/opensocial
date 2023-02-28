import Link from "next/link"

import NavBar from "@/components/layout/NavBar"
import Logo from "@/components/layout/Logo"
import ProjectsList from "@/components/projects/ProjectsList"

const Drawer = () => {
  return(
    <div className="bg-base-100 drawer drawer-mobile max-lg:drawer-end">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar />
        <ProjectsList />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="menu bg-base-200 w-80">
          <div className="flex h-16 items-center justify-center">
            <Logo visible="max-lg:hidden" />
          </div>
          <ul className="menu p-4 w-80 bg-base-200 text-base-content">
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

export default Drawer
