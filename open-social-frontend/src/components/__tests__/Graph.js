/**
 * @jest-environment jsdom
 */

import React from "react"
import { render } from "@testing-library/react"

import Graph from "../Graph"


const data = [
  {
    "month": "2020-11",
    "commits": 20
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
]


test("ProjectGraph can be rendered", () => {
  const { getByTestId } = render(<Graph data={data} inViewport={true} />)

  expect(getByTestId("Graph")).toBeDefined()
})
