import * as React from "react"
import { graphql } from "gatsby";
import App from "../components/App"
import Seo from "../components/SEO";


const IndexPage = ({ data }) => {
  return (
    <main>
      <Seo/>
      <App initialProjects={data} />
    </main>
  )
};

export const query = graphql`
  {
    internalProjects {
      projects {
        commits_graph_data {
          commits
          month
        }
        watchers
        updated
        total_commits
        stargazers
        sorting
        pushed
        project_url
        project_name
        open_issues
        language
        full_name
        forks
        description
        created
        contributors
      }
      page_identifier {
        full_name
      }
    }
  }
`

export default IndexPage
