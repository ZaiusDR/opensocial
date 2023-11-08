import { render, screen } from "@testing-library/react"
import ProjectRating from "@/components/projects/ProjectRating"

describe('ProjectRating', () => {
  it('renders ProjectRating with 5 stars', () => {
    render(<ProjectRating id="fake-project" rating="1.00" />)

    const halfStars = screen.getAllByRole('radio')

    expect(halfStars[9]).toHaveAttribute('checked')
  })

  it('renders ProjectRating with 2.5 stars', () => {
    render(<ProjectRating id="fake-project" rating="0.50" />)

    const halfStars = screen.getAllByRole('radio')

    expect(halfStars[4]).toHaveAttribute('checked')
  })
})
