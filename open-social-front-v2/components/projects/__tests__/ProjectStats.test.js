import { render, screen } from '@testing-library/react'
import ProjectStats from '../ProjectStats'

describe('ProjectStats', () => {
  it('renders ProjectStats component with icons', () => {
    render(<ProjectStats commits="94" contributors="23" stargazers="58" />)

    const commits = screen.getByRole('img', {name: 'Commits Icon'})
    const contributors = screen.getByRole('img', {name: 'Contributors Icon'})
    const stargazers = screen.getByRole('img', {name: 'Stargazers Icon'})

    expect(commits).toBeInTheDocument()
    expect(contributors).toBeInTheDocument()
    expect(stargazers).toBeInTheDocument()
  })

  it('renders ProjectStats component with data', () => {
    render(<ProjectStats commits="94" contributors="23" stargazers="58" />)

    const commits = screen.getByText('94')
    const contributors = screen.getByText('23')
    const stargazers = screen.getByText('58')

    expect(commits).toBeInTheDocument()
    expect(contributors).toBeInTheDocument()
    expect(stargazers).toBeInTheDocument()
  })
})
