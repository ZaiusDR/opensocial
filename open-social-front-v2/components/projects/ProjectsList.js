import useSWR from 'swr'
import ProjectItem from "@/components/projects/ProjectItem"
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const ProjectsList = () => {
  const { data, error, isLoading } = useSWR('https://api.open-social.net/projects', fetcher)

  if (error) return <div>Failed to load projects</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container px-6 mx-auto max-w-screen mt-16">
      <div className="grid grid-cols-1 gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
        {data.projects.map(project =>
          <ProjectItem key={project.project_name} projectData={project} />
        )}
      </div>
    </div>
  )
}

export default ProjectsList
