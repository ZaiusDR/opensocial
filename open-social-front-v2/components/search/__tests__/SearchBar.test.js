import { render, screen, fireEvent, act } from "@testing-library/react"
import SearchBar from "@/components/search/SearchBar"

jest.mock("swr", () => ({
  __esModule: true,
  default: () => ({ data: null, error: null }),
}))

describe("SearchBar", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it("calls onSearch with the query after 300ms debounce", () => {
    const onSearch = jest.fn()
    render(<SearchBar onSearch={onSearch} />)
    const input = screen.getByPlaceholderText("Search projects...")

    fireEvent.change(input, { target: { value: "climate" } })
    expect(onSearch).not.toHaveBeenCalledWith("climate")

    act(() => { jest.advanceTimersByTime(300) })

    expect(onSearch).toHaveBeenCalledWith("climate")
  })

  it("calls onSearch immediately when Enter is pressed", () => {
    const onSearch = jest.fn()
    render(<SearchBar onSearch={onSearch} />)
    const input = screen.getByPlaceholderText("Search projects...")

    fireEvent.change(input, { target: { value: "climate" } })
    fireEvent.keyDown(input, { key: "Enter" })

    expect(onSearch).toHaveBeenCalledWith("climate")
  })

  it("clears the input and calls onSearch with empty string on Escape", () => {
    const onSearch = jest.fn()
    render(<SearchBar onSearch={onSearch} />)
    const input = screen.getByPlaceholderText("Search projects...")

    fireEvent.change(input, { target: { value: "climate" } })
    fireEvent.keyDown(input, { key: "Escape" })

    expect(input).toHaveValue("")
    expect(onSearch).toHaveBeenCalledWith("")
  })

  it("does not trigger a new debounce call before 300ms elapses", () => {
    const onSearch = jest.fn()
    render(<SearchBar onSearch={onSearch} />)
    const input = screen.getByPlaceholderText("Search projects...")

    fireEvent.change(input, { target: { value: "cli" } })
    act(() => { jest.advanceTimersByTime(100) })
    fireEvent.change(input, { target: { value: "clim" } })
    act(() => { jest.advanceTimersByTime(100) })
    fireEvent.change(input, { target: { value: "climate" } })

    // None of the intermediate values should have been submitted yet
    expect(onSearch).not.toHaveBeenCalledWith("cli")
    expect(onSearch).not.toHaveBeenCalledWith("clim")
    expect(onSearch).not.toHaveBeenCalledWith("climate")

    act(() => { jest.advanceTimersByTime(300) })

    expect(onSearch).toHaveBeenCalledWith("climate")
  })
})
