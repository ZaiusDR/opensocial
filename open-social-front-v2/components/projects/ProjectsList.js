import useSWRInfinite from 'swr/infinite'

import ProjectItem from "@/components/projects/ProjectItem"
import Loader from "@/components/UI/Loader"
import LoadMoreButton from "@/components/projects/LoadMoreButton"


const fetcher = (...args) => fetch(...args).then((res) => res.json())


const ProjectsList = (props) => {

  const getKey = (pageIndex, previousPageData) => {
    let apiUrl = "https://api.open-social.net/projects?"

    if (props.sortedBy) {
      apiUrl = apiUrl + `sorted_by=${props.sortedBy}&`
    }

    if (previousPageData) {
      const stringifiedPageIdentifier = JSON.stringify(previousPageData.page_identifier)
      const nextPageValue = new URLSearchParams({page: stringifiedPageIdentifier}).toString()
      apiUrl = apiUrl + `${nextPageValue}`
    }

    return apiUrl
  }

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher)

  if (error) return <div className="container flex w-full h-full items-center justify-center">Failed to load projects</div>
  if (!data) return <Loader />

  return (
    <div className="container px-6 mx-auto max-w-screen mt-16">
      <div className="grid grid-cols-1 gap-8 my-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data.map((page) => {
          return page.projects.map((project => <ProjectItem key={project.full_name} projectData={project} />))
        })}
      </div>
      <LoadMoreButton onClick={() => setSize(size + 1)}/>
    </div>
  )
}

export default ProjectsList
