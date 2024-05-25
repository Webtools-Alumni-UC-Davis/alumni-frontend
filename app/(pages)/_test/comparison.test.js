import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../comparison/_components/Header"
import AlumniUpdates from "../comparison/_components/AlumniUpdates";

global.fetch = jest.fn();

describe('AlumniUpdates', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders mock updates', async () => {
    const mockUpdates = ["Update 1", "Update 2"];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUpdates),
    });

    render(<AlumniUpdates />);

    await waitFor(() => {
      expect(screen.getByText('Alumni Updates')).toBeInTheDocument();
    });
  });

  it('renders updates data when fetched successfully', async () => {
    const mockUpdates = ["Update 1", "Update 2", "Update 3", "Update 4", "Update 5"];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockUpdates),
    });

    render(<AlumniUpdates />);

    for (const update of mockUpdates) {
      const updateElement = await screen.findByText(update);
      expect(updateElement).toBeInTheDocument();
    }
  });

});

describe('Header', () => {
  it('renders header', () => {
    render(<Header />);

    expect(screen.getByText('Data Comparison')).toBeInTheDocument();
  });
});