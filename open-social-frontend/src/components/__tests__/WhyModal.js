/**
 * @jest-environment jsdom
 */

import React from "react"
import { render } from "@testing-library/react"

import WhyModal from "../WhyModal"

test("WhyModal can be rendered", () => {
  const { getByTestId } = render(<WhyModal open={true}/>)

  expect(getByTestId("WhyModal")).toBeDefined()
})
