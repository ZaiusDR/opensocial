import { render, screen } from '@testing-library/react'

import Chart from '../Chart'

// Mock the ChartBar component
jest.mock('../ChartBar', () => ({ dataPoint, max }) => (
  <div data-testid="chart-bar">
    {dataPoint.month}: {dataPoint.commits} / {max}
  </div>
))

describe('Chart Component', () => {
  const sampleData = [
    { month: '2023-06', commits: 5 },
    { month: '2023-07', commits: 10 },
    { month: '2023-08', commits: 15 },
    { month: '2023-09', commits: 20 },
    { month: '2023-10', commits: 25 },
    { month: '2023-11', commits: 30 }
  ]

  it('should render the chart correctly with data', () => {
    render(<Chart data={sampleData} />)

    expect(screen.getByText('Monthly Commits')).toBeInTheDocument()
    expect(screen.getByText('Last six months')).toBeInTheDocument()

    const chartBars = screen.getAllByTestId('chart-bar')
    expect(chartBars).toHaveLength(sampleData.length)

    expect(screen.getByText('2023-11: 30 / 30')).toBeInTheDocument()
  })
})
