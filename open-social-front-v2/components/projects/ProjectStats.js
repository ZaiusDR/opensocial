import contributorsIcon from "../../public/contributors.svg"
import commitIcon from "../../public/commits.svg"
import stargazersIcon from "../../public/stargazers.svg"
import ProjectStatItem from "@/components/projects/ProjectStatItem"


const ProjectStats = (props) => {
  const statsData = [
    {
      data: props.commits,
      image: commitIcon,
      alt: "Commits Icon",
      tooltip: "Total Commits",
    },
    {
      data: props.contributors,
      image: contributorsIcon,
      alt: "Contributors Icon",
      tooltip: "Contributors",
    },
    {
      data: props.stargazers,
      image: stargazersIcon,
      alt: "Stargazers Icon",
      tooltip: "Project Stars",
    },
  ]

  return (
    <div className="flex flex-grow w-full justify-center">
      {statsData.map(item =>
        <ProjectStatItem key={item.alt} image={item.image} alt={item.alt} data={item.data} tooltip={item.tooltip}/>
      )}
    </div>
  )
}

export default ProjectStats
