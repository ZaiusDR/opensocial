/**
 * @jest-environment jsdom
 */

import React from "react"
import { render } from "@testing-library/react"

import "../../../tests/__mocks__/browser-support-mocks"

import HeaderCarousel from "../HeaderCarousel"

test("HeaderCarousel can be rendered", () => {
  const { getByTestId } = render(<HeaderCarousel/>)

  expect(getByTestId("HeaderCarousel")).toBeDefined()
})
