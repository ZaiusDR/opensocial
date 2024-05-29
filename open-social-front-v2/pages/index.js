import { useState } from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
      {!showProjects && <Hero onClick={handleShowProjectsClicked}/>}
      {showProjects && <MainLayout />}
      <SpeedInsights/>
    </>
  )
}
