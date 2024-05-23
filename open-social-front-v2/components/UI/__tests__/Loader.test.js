import { render, screen } from "@testing-library/react"
import Loader from "@/components/UI/Loader"

describe('Loader Component', () => {
  it('should render the loader correctly', () => {
    render(<Loader />);

    const progressElement = screen.getByRole('progressbar', {name: ''});
    expect(progressElement).toBeInTheDocument();
  });
});
