import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../export/_components/Header";
import ExportCard from "../export/_components/ExportCard";

global.fetch = jest.fn();

describe('ExportCard', () => {
    beforeEach(() => {
      fetch.mockClear();
    });
  
    it('renders CSV button', () => {
      render(<ExportCard />);
  
      expect(screen.getByText('Export Data Into A CSV File Here:')).toBeInTheDocument();
    });
  
    it('handles export data when clicked', async () => {
      const mockAlumniData = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Doe', email: 'jane@example.com' },
      ];
  
      fetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockAlumniData),
      });
  
      render(<ExportCard />);
  
      const downloadButton = screen.getByText('Download CSV');
      fireEvent.click(downloadButton);
  
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("https://webtools-api.engr.ucdavis.edu/alumnis/allalumni");
      });
    });
  });
  
describe('Header', () => {
    it('renders header', () => {
        render(<Header />);

        expect(screen.getByText('Data Export')).toBeInTheDocument();
    });
});