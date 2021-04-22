import React from "react"
import { render } from "@testing-library/react"

import "../../../tests/__mocks__/browser-support-mocks"

import App from "../App"


const initialProjects = {
  internalProjects: {
    projects: [
      {
        "rate": "0.0",
        "commits_graph_data": [
          {
            "month": "2020-11",
            "commits": 0
          },
          {
            "month": "2020-12",
            "commits": 0
          },
          {
            "month": "2021-01",
            "commits": 0
          },
          {
            "month": "2021-02",
            "commits": 0
          },
          {
            "month": "2021-03",
            "commits": 0
          },
          {
            "month": "2021-04",
            "commits": 0
          }
        ],
        "created": "2020-10-19T16:55:35Z",
        "ttl": 1619151682,
        "stargazers": 0,
        "full_name": "Achmat1/Achmat-Isaacs---climate_change",
        "open_issues": 0,
        "total_commits": 0,
        "language": null,
        "pushed": "2020-10-19T16:55:36Z",
        "project_name": "Achmat-Isaacs---climate_change",
        "updated": "2020-10-19T16:55:35Z",
        "forks": 0,
        "sorting": 0,
        "project_url": "https://github.com/Achmat1/Achmat-Isaacs---climate_change",
        "watchers": 1,
        "description": null,
        "contributors": 0
      }
    ]
  }
}

test("Projects can be rendered", () => {
  const { getByTestId } = render(<App initialProjects={initialProjects}/>)

  expect(getByTestId("App")).toBeDefined()
})
