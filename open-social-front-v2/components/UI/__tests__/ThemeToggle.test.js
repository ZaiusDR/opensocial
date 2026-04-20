import { render, screen, fireEvent, act } from "@testing-library/react"
import ThemeToggle from "@/components/UI/ThemeToggle"

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute("data-theme")
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({ matches: false, media: query })),
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe("ThemeToggle", () => {
  it("shows moon icon when light theme is active", async () => {
    document.documentElement.setAttribute("data-theme", "opensocial")

    await act(async () => { render(<ThemeToggle />) })

    expect(screen.getByRole("button", { name: /switch to dark theme/i })).toBeInTheDocument()
  })

  it("shows sun icon when dark theme is active", async () => {
    document.documentElement.setAttribute("data-theme", "opensocial-dark")

    await act(async () => { render(<ThemeToggle />) })

    expect(screen.getByRole("button", { name: /switch to light theme/i })).toBeInTheDocument()
  })

  it("switches to dark theme when clicked on light", async () => {
    document.documentElement.setAttribute("data-theme", "opensocial")

    await act(async () => { render(<ThemeToggle />) })
    await act(async () => { fireEvent.click(screen.getByRole("button")) })

    expect(document.documentElement.getAttribute("data-theme")).toBe("opensocial-dark")
    expect(localStorage.getItem("theme")).toBe("opensocial-dark")
  })

  it("switches to light theme when clicked on dark", async () => {
    document.documentElement.setAttribute("data-theme", "opensocial-dark")

    await act(async () => { render(<ThemeToggle />) })
    await act(async () => { fireEvent.click(screen.getByRole("button")) })

    expect(document.documentElement.getAttribute("data-theme")).toBe("opensocial")
    expect(localStorage.getItem("theme")).toBe("opensocial")
  })

  it("persists the theme choice to localStorage", async () => {
    document.documentElement.setAttribute("data-theme", "opensocial")

    await act(async () => { render(<ThemeToggle />) })
    await act(async () => { fireEvent.click(screen.getByRole("button")) })
    await act(async () => { fireEvent.click(screen.getByRole("button")) })

    expect(localStorage.getItem("theme")).toBe("opensocial")
  })
})
