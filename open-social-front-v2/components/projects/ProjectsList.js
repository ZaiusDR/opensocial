import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const ProjectsList = () => {
  const { data, error, isLoading } = useSWR('https://api.open-social.net/projects', fetcher)

  if (error) return <div>Failed to load projects</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="">
      {data.projects.map(project =>
        <div key={project.project_name}>{project.project_name}</div>
      )}
    </div>
  )
}

export default ProjectsList
