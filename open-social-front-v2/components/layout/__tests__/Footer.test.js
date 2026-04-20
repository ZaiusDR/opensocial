import { render, screen } from "@testing-library/react"
import Footer from "@/components/layout/Footer"

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />)

    expect(screen.getByText('Open')).toBeInTheDocument()
    expect(screen.getByText('Social')).toBeInTheDocument()
  })

  it('renders the GitHub link with correct href', () => {
    render(<Footer />)

    const link = screen.getByRole('link', { name: /github/i })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://github.com/zaiusdr/opensocial')
  })

  it('renders the copyright with the current year', () => {
    render(<Footer />)

    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument()
  })
})
