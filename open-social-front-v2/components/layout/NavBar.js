import Logo from "@/components/layout/Logo"

const NavBar = () => {
  return (
    <div className="navbar sticky top-0 z-50 w-full shadow bg-white">
      <Logo visible="lg:hidden"/>
      <div className="w-full justify-end lg:hidden">
        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
    </div>
  )
}

export default NavBar
