import React from 'react'
import { render, fireEvent, act, screen } from "@testing-library/react"
import GoToTopButton from '../GoToTopButton'

describe('GoToTopButton Component', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0
    })

    // Mock window.scrollTo
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {})

    // Add event listener mock
    jest.spyOn(window, 'addEventListener').mockImplementation((event, cb) => {
      if (event === 'scroll') {
        window.scrollCallback = cb
      }
    })

    // Dispatch a scroll event to trigger the useEffect
    window.dispatchEvent(new Event('scroll'))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should not be visible initially', () => {
    render(<GoToTopButton />)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('hidden')
  })

  it('should become visible when scrolled down more than 1000px', () => {
    render(<GoToTopButton />)
    window.scrollY = 1001
    act(() => {
      window.scrollCallback()
    })
    const button = screen.getByRole('button')

    expect(button).not.toHaveClass('hidden')
  })

  it('should scroll to top when clicked', () => {
    render(<GoToTopButton />)
    window.scrollY = 1001
    act(() => {
      window.scrollCallback()
    })
    const button = screen.getByRole('button')

    expect(button).not.toHaveClass('hidden')

    fireEvent.click(button)
    expect(window.scrollTo).toHaveBeenCalledWith({ left: 0, top: 0, behavior: 'smooth' })
  })

  it('should hide when scrolled back to the top', () => {
    render(<GoToTopButton />)
    window.scrollY = 1001
    act(() => {
      window.scrollCallback()
    })
    const button = screen.getByRole('button')

    expect(button).not.toHaveClass('hidden')

    window.scrollY = 0
    act(() => {
      window.scrollCallback()
    })
    expect(button).toHaveClass('hidden')
  })
})
