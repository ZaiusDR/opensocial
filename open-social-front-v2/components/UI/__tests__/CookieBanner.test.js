import { render, screen, fireEvent, act } from "@testing-library/react"
import CookieBanner from "@/components/UI/CookieBanner"

jest.mock("react-gtm-module/dist/TagManager", () => ({
  initialize: jest.fn(),
}))

import TagManager from "react-gtm-module/dist/TagManager"

const deleteCookieConsent = () => {
  Object.defineProperty(document, "cookie", {
    writable: true,
    value: "",
  })
}

describe("CookieBanner", () => {
  beforeEach(() => {
    deleteCookieConsent()
    jest.clearAllMocks()
  })

  it("shows the banner when no consent cookie is set", async () => {
    await act(async () => {
      render(<CookieBanner />)
    })

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText(/we use cookies to count page visits/i)).toBeInTheDocument()
  })

  it("hides the banner when consent cookie is already set", async () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "cookie_consent=accepted",
    })

    await act(async () => {
      render(<CookieBanner />)
    })

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("hides the banner and initializes GTM when Accept is clicked", async () => {
    await act(async () => {
      render(<CookieBanner />)
    })

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /accept/i }))
    })

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(TagManager.initialize).toHaveBeenCalledTimes(1)
  })

  it("hides the banner without initializing GTM when Decline is clicked", async () => {
    await act(async () => {
      render(<CookieBanner />)
    })

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /decline/i }))
    })

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    expect(TagManager.initialize).not.toHaveBeenCalled()
  })

  it("renders Accept and Decline buttons", async () => {
    await act(async () => {
      render(<CookieBanner />)
    })

    expect(screen.getByRole("button", { name: /accept/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /decline/i })).toBeInTheDocument()
  })
})
