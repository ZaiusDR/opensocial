import { render, screen } from '@testing-library/react'
import ChartBar from '../ChartBar'


describe('ChartBar Component', () => {
  const sampleDataPoint = { month: '2023-11', commits: 25 }
  const maxCommits = 50

  it('should render the ChartBar correctly', () => {
    render(<ChartBar dataPoint={sampleDataPoint} max={maxCommits} />)

    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getByText('Nov')).toBeInTheDocument()
  })

  it('should not display the number if commits are zero', () => {
    const zeroCommitsDataPoint = { month: '2023-11', commits: 0 }
    const { container } = render(<ChartBar dataPoint={zeroCommitsDataPoint} max={maxCommits} />)
    const barElement = container.querySelector('.bg-primary')

    expect(barElement).toBeEmptyDOMElement()
  })
})
