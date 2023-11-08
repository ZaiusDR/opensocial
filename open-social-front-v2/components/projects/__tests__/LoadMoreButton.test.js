import { render, screen } from '@testing-library/react'
import LoadMoreButton from '../LoadMoreButton'

describe('LoadMoreButton', () => {
  it('renders LoadMoreButton component', () => {
    render(<LoadMoreButton />)

    const loadMoreButton = screen.getByRole('button', {name: /Load more/i})

    expect(loadMoreButton).toBeInTheDocument()
  })
})
