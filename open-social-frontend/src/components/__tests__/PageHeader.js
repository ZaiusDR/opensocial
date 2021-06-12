/**
 * @jest-environment jsdom
 */

import React from "react"
import { render } from "@testing-library/react"

import PageHeader from "../PageHeader"

test("PageHeader can be rendered", () => {
  const { getByTestId } = render(<PageHeader/>)

  expect(getByTestId("PageHeader")).toBeDefined()
})
