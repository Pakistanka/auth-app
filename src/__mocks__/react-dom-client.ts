// Mock for react-dom/client (React 18) for React 16 compatibility
export const createRoot = jest.fn(() => ({
  render: jest.fn(),
  unmount: jest.fn(),
}));

export default {
  createRoot,
};
