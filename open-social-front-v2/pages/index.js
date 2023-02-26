import { useState } from "react"

import Hero from "@/components/home/Hero"
import ProjectsLayout from "@/components/projects/ProjectsLayout"
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
      {showProjects && <ProjectsLayout />}
    </>
  )
}
