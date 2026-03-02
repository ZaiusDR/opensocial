import { render, screen } from "@testing-library/react"
import Loader from "@/components/UI/Loader"

describe('Loader Component', () => {
  it('should render the loader correctly', () => {
    const { container } = render(<Loader />);

    const loaderElement = container.querySelector('.loading-dots');
    expect(loaderElement).toBeInTheDocument();
  });
});
