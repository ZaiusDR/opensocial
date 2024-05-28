import useSWRInfinite from 'swr/infinite'

import ProjectItem from "@/components/projects/ProjectItem"
import Loader from "@/components/UI/Loader"
import LoadMoreButton from "@/components/projects/LoadMoreButton"
import { useEffect } from "react"


const fetcher = (...args) => fetch(...args).then((res) => res.json())


const ProjectsList = (props) => {

  useEffect(() => {
    setSize(1)
  }, [props.sortedBy, props.topics, props.languages])

  const getKey = (pageIndex, previousPageData) => {
    let apiUrl = "https://api.open-social.net/projects?"

    if (props.sortedBy) {
      apiUrl = apiUrl + `sorted_by=${props.sortedBy}&`
    }

    if (props.topics) {
      apiUrl = apiUrl + `topics=${props.topics}&`
    }

    if (props.languages) {
      apiUrl = apiUrl + `languages=${props.languages}&`
    }

    if (previousPageData) {
      apiUrl = apiUrl + `page=${pageIndex}`
    }

    return apiUrl
  }

  const { data, error, isValidating, size, setSize } = useSWRInfinite(getKey, fetcher)

  if (error) return <div className="container flex w-full h-full items-center justify-center">Failed to load projects</div>

  return (
    <div className="container px-6 mx-auto max-w-screen mt-16">
      <div className="grid grid-cols-1 gap-8 my-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data ? data.map((page) => {
          return page.projects.map((project => <ProjectItem key={project.full_name} projectData={project} />))
        }) : null}
      </div>
      { isValidating ? <Loader /> : <LoadMoreButton onClick={() => setSize(size + 1)}/> }
    </div>
  )
}

export default ProjectsList
