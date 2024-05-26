import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../export/_components/Header";
import ExportCard from "../export/_components/ExportCard";

global.fetch = jest.fn();

describe("ExportCard", () => {
  const mockAlumniData = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Doe", email: "jane@example.com" },
  ];

  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders CSV button", async () => {
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockAlumniData),
    });

    render(<ExportCard />);

    expect(screen.getByText("Export Data Into A CSV File Here:")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Download CSV")).toBeInTheDocument();
    });
  });

  it("shows loading state while fetching data", async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({ json: jest.fn().mockResolvedValueOnce(mockAlumniData) })
    );

    render(<ExportCard />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(screen.getByText("Download CSV")).toBeInTheDocument();
    });
  });

  it("handles fetch error", async () => {
    const errorMessage = "Failed to fetch data";
    const mockError = new Error(errorMessage);
    fetch.mockRejectedValueOnce(mockError);

    console.error = jest.fn();

    render(<ExportCard />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Error fetching alumni data:", mockError);
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      expect(screen.queryByText("Download CSV")).not.toBeInTheDocument();
    });
  });
});

describe("Header", () => {
  it("renders header", () => {
    render(<Header />);
    expect(screen.getByText("Data Export")).toBeInTheDocument();
  });
});