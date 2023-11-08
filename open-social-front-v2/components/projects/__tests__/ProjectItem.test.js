import { render, screen } from "@testing-library/react"
import ProjectItem from "@/components/projects/ProjectItem"

const fakeProjectData = {
  "rate": "0.11",
  "topic": "feminism",
  "commits_graph_data": [
    {
      "month": "2023-06",
      "commits": 0
    },
    {
      "month": "2023-07",
      "commits": 0
    },
    {
      "month": "2023-08",
      "commits": 0
    },
    {
      "month": "2023-09",
      "commits": 0
    },
    {
      "month": "2023-10",
      "commits": 0
    },
    {
      "month": "2023-11",
      "commits": 0
    }
  ],
  "created": "2023-05-03T16:56:51Z",
  "avatar_url": "https://avatars.githubusercontent.com/u/117047322?v=4",
  "ttl": 1699593013,
  "stargazers": 0,
  "full_name": "fake-user/fake-project",
  "open_issues": 0,
  "total_commits": 2,
  "language": null,
  "pushed": "2023-05-03T16:58:33Z",
  "project_name": "fake-project",
  "updated": "2023-05-03T16:56:51Z",
  "forks": 0,
  "sorting": 0,
  "project_url": "https://github.com/fake-user/fake-project",
  "homepage": null,
  "watchers": 1,
  "description": "10 survey responses from predominantly university students regarding agreeable approaches to feminism.",
  "contributors": 1
}


describe('ProjectItem', () => {
  it('renders ProjectItem component heading', () => {
    render(<ProjectItem projectData={fakeProjectData}/>)

    const heading = screen.getByRole('heading', {name: /feminism/i})

    expect(heading).toHaveTextContent('feminism')
  })

  it('renders ProjectItem component link', () => {
    render(<ProjectItem projectData={fakeProjectData}/>)

    const link = screen.getByRole('link', {name: /fake-project/i})

    expect(link).toBeInTheDocument()
  })
})
