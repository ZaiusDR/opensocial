import { useState } from "react"

import Hero from "@/components/home/Hero"
import MainLayout from "@/components/layout/MainLayout"
import HeadSection from "@/components/metadata/HeadSection"


export default function Home() {
  const [showProjects, setShowProjects] = useState(false)

  const handleShowProjectsClicked = (event) => {
    setShowProjects(true)
  }

  return (
    <>
      <HeadSection/>
      {/*Please don't ask*/}
      {/*<div className="rating rating-lg rating-half">*/}
      {/*  <input type="radio" name="rating-10" disabled className="bg-green-500 mask mask-star-2 mask-half-1" defaultChecked={true}/>*/}
      {/*  <input type="radio" name="rating-10" disabled className="bg-green-500 mask mask-star-2 mask-half-2" />*/}
      {/*</div>*/}
      {!showProjects && <Hero onClick={handleShowProjectsClicked}/>}
      {showProjects && <MainLayout />}
    </>
  )
}
