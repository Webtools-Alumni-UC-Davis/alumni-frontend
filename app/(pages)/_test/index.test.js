import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../(index-page)/_components/Header";
import AlumniJobs from "../(index-page)/_components/AlumniJobs";
import AlumniLocations from "../(index-page)/_components/AlumniLocations";
import TopCompanies from "../(index-page)/_components/TopCompanies";
import AlumniUpdates from "../(index-page)/_components/AlumniUpdates";
import CurrentCount from "../(index-page)/_components/CurrentCount";
import YearAlumni from "../(index-page)/_components/YearAlumni";

describe("Header component", () => {
  it("renders with correct text and styling", () => {
    const { getByText, getByTestId } = render(<Header />);

    const containerElement = getByTestId("header-container");
    expect(containerElement).toBeInTheDocument();

    const textElement = getByText("Dashboard");
    expect(textElement).toBeInTheDocument();
  });
});

jest.mock('chart.js/auto', () => ({
  __esModule: true,
  default: jest.fn(),
}));

global.fetch = jest.fn();

describe('AlumniJobs', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders mock job data', async () => {
    const mockJobData = [
      { _id: 'Job1', count: 10 },
      { _id: 'Job2', count: 20 },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockJobData),
    });

    render(<AlumniJobs />);

    await waitFor(() => {
      expect(screen.getByTestId('alumni-jobs')).toBeInTheDocument();
    });
  });

  it('renders a link to export page', async () => {
    const mockJobData = [
      { _id: 'Job1', count: 10 },
      { _id: 'Job2', count: 20 },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockJobData),
    });

    render(<AlumniJobs />);

    await waitFor(() => {
      const exportLink = screen.getByText('View Report');
      expect(exportLink).toBeInTheDocument();
    });
  });

  it('renders job data when fetched successfully', async () => {
    const mockJobData = [
      { _id: 'Job1', count: 10 },
      { _id: 'Job2', count: 20 },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockJobData),
    });

    render(<AlumniJobs />);

    const job1Element = await screen.findByText('Job1');
    const job2Element = await screen.findByText('Job2');

    expect(job1Element).toBeInTheDocument();
    expect(job2Element).toBeInTheDocument();
  });

  it('calls the export link when clicked', async () => {
    const mockJobData = [
      { _id: 'Job1', count: 10 },
      { _id: 'Job2', count: 20 },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockJobData),
    });

    render(<AlumniJobs />);

    await waitFor(() => {
      const exportLink = screen.getByText('View Report');
      expect(exportLink).toBeInTheDocument();
    });

    const exportLink = screen.getByText('View Report');
    fireEvent.click(exportLink);
  });
});

describe('AlumniLocations', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders mock location data', async () => {
    const mockLocationData = [
      { _id: 'Location1', count: 10 },
      { _id: 'Location2', count: 20 },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockLocationData),
    });

    render(<AlumniLocations />);

    await waitFor(() => {
      expect(screen.getByText('Top Alumni Locations')).toBeInTheDocument();
    });
  });

  it('renders top locations data when fetched successfully', async () => {
    const mockLocationData = [
      { _id: 'Location1', count: 10 },
      { _id: 'Location2', count: 20 },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockLocationData),
    });

    render(<AlumniLocations />);

    const location1Element = await screen.findByText('Location1');
    const location2Element = await screen.findByText('Location2');

    expect(location1Element).toBeInTheDocument();
    expect(location2Element).toBeInTheDocument();
  });

  it('renders the chart correctly', async () => {
    const mockLocationData = [
      { _id: 'Location1', count: 10 },
      { _id: 'Location2', count: 20 },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockLocationData),
    });

    render(<AlumniLocations />);

    await waitFor(() => {
      const chartElement = screen.getByTestId('locationChart');
      expect(chartElement).toBeInTheDocument();
    });
  });
});

describe('TopCompanies', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders mock company data', async () => {
    const mockCompanyData = [
      { _id: 'Company1', count: 10 },
      { _id: 'Company2', count: 20 },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockCompanyData),
    });

    render(<TopCompanies />);

    await waitFor(() => {
      expect(screen.getByText('Top Companies')).toBeInTheDocument();
    });
  });

  it('renders company data when fetched successfully', async () => {
    const mockCompanyData = [
      { _id: 'Company1', count: 10 },
      { _id: 'Company2', count: 20 },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockCompanyData),
    });

    render(<TopCompanies />);

    const company1Element = await screen.findByText('Company1');
    const company2Element = await screen.findByText('Company2');

    expect(company1Element).toBeInTheDocument();
    expect(company2Element).toBeInTheDocument();
  });

  it('renders the chart correctly', async () => {
    const mockCompanyData = [
      { _id: 'Company1', count: 10 },
      { _id: 'Company2', count: 20 },
    ];

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockCompanyData),
    });

    render(<TopCompanies />);

    await waitFor(() => {
      const chartElement = screen.getByTestId('companyChart');
      expect(chartElement).toBeInTheDocument();
    });
  });
});

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

describe('CurrentCount', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders mock current count', async () => {
    const mockCount = { count: 1234 };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockCount),
    });

    render(<CurrentCount />);

    await waitFor(() => {
      expect(screen.getByText('Current Alumni Count')).toBeInTheDocument();
    });
  });

  it('renders alumni count when fetched successfully', async () => {
    const mockCount = { count: 1234 };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockCount),
    });

    render(<CurrentCount />);

    const countElement = await screen.findByText('1234');
    expect(countElement).toBeInTheDocument();
  });
});

describe('YearAlumni', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders mock current year count', async () => {
    const mockCount = { count: 567 };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockCount),
    });

    render(<YearAlumni />);

    await waitFor(() => {
      expect(screen.getByText('This Year Alumni Count')).toBeInTheDocument();
    });
  });

  it('renders alumni count when fetched successfully', async () => {
    const mockCount = { count: 567 };

    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockCount),
    });

    render(<YearAlumni />);

    const countElement = await screen.findByText('567');
    expect(countElement).toBeInTheDocument();
  });
});