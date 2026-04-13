import { render, screen, fireEvent } from "@testing-library/react"
import ResultsList from "@/components/search/ResultsList"

const fakeResults = [
  { _id: "1", description: "A platform for climate action" },
  { _id: "2", description: "Open source humanitarian tools" },
]

describe("ResultsList", () => {
  it("renders result descriptions", () => {
    render(<ResultsList results={fakeResults} onSelect={() => {}} />)

    expect(screen.getByText("A platform for climate action")).toBeInTheDocument()
    expect(screen.getByText("Open source humanitarian tools")).toBeInTheDocument()
  })

  it("calls onSelect with the description when an item is clicked", () => {
    const onSelect = jest.fn()
    render(<ResultsList results={fakeResults} onSelect={onSelect} />)

    fireEvent.click(screen.getByText("A platform for climate action"))

    expect(onSelect).toHaveBeenCalledWith("A platform for climate action")
  })

  it("renders a listbox with option roles", () => {
    render(<ResultsList results={fakeResults} onSelect={() => {}} />)

    expect(screen.getByRole("listbox")).toBeInTheDocument()
    expect(screen.getAllByRole("option")).toHaveLength(2)
  })
})
