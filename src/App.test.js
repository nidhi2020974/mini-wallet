import { render, screen } from "@testing-library/react";
import App from "./App";

// ✅ INLINE MOCK — blocks axios completely
jest.mock("./api/api", () => ({
  api: {
    get: jest.fn(() => Promise.resolve({ data: [] })),
    post: jest.fn(),
    patch: jest.fn()
  }
}));

test("renders Mini Wallet title", () => {
  render(<App />);
  expect(screen.getByText(/mini wallet/i)).toBeInTheDocument();
});

test("renders Wallet Balance section", () => {
  render(<App />);
  expect(screen.getByText(/wallet balance/i)).toBeInTheDocument();
});
