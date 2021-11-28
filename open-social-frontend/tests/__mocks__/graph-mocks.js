window.URL.createObjectURL = () => {}

import "@ant-design/plots/lib/components/line"
jest.mock('@ant-design/plots/lib/components/line', () => {
  return {
    __esModule: true,
    Line: true,
    default: () => {
      return <div>This is the Graph</div>;
    },
  }
});
