import useSWR from 'swr'

import ProjectItem from "@/components/projects/ProjectItem"
import Loader from "@/components/UI/Loader"
import LoadMoreButton from "@/components/projects/LoadMoreButton"


const fetcher = (...args) => fetch(...args).then((res) => res.json())

const ProjectsList = (props) => {
  const { data, error, isLoading } = useSWR(`https://api.open-social.net/projects?sorted_by=${props.sortedBy}`, fetcher)

  if (error) return <div>Failed to load projects</div>
  if (isLoading) return <Loader />

  return (
    <div className="container px-6 mx-auto max-w-screen mt-16">
      <div className="grid grid-cols-1 gap-8 my-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data.projects.map(project =>
          <ProjectItem key={project.full_name} projectData={project} />
        )}
      </div>
      <LoadMoreButton />
    </div>
  )
}

export default ProjectsList
