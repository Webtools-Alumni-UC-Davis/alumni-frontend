import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../recommendations/_components/Header';
import SuggestedCard from '../recommendations/_components/SuggestedCard';
import SearchForm from "../recommendations/_components/SearchForm/SearchForm";
import SelectedTags from "../recommendations/_components/SelectedTags/SelectedTags";

describe('Header', () => {
  it('renders the header text correctly', () => {
    render(<Header />);
    const headerText = screen.getByText('Recommendations');
    expect(headerText).toBeInTheDocument();
  });
});

describe('SearchForm', () => {
  it('renders the search form correctly', () => {
    const handleSearchSubmit = jest.fn();
    render(<SearchForm handleSearchSubmit={handleSearchSubmit} />);
    const searchInput = screen.getByPlaceholderText('Search company by name, state, year, investor, and industry');
    const submitButton = screen.getByText('Submit Search');
    expect(searchInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('calls the handleSearchSubmit function when the form is submitted', () => {
    const handleSearchSubmit = jest.fn();
    render(<SearchForm handleSearchSubmit={handleSearchSubmit} />);
    const submitButton = screen.getByText('Submit Search');
    fireEvent.click(submitButton);
    expect(handleSearchSubmit).toHaveBeenCalled();
  });
});

describe('SelectedTags', () => {
  it('renders selected tags correctly', () => {
    const selectedTags = ['Tag 1', 'Tag 2'];
    const handleTagDelete = jest.fn();
    const handleClearAllTags = jest.fn();
    render(<SelectedTags selectedTags={selectedTags} handleTagDelete={handleTagDelete} handleClearAllTags={handleClearAllTags} />);
    const tag1 = screen.getByText('Tag 1');
    const tag2 = screen.getByText('Tag 2');
    const clearAllButton = screen.getByText('Clear All');
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    expect(clearAllButton).toBeInTheDocument();
  });

  it('calls the handleTagDelete function when the delete icon is clicked', () => {
    const selectedTags = ['Tag 1', 'Tag 2'];
    const handleTagDelete = jest.fn();
    const handleClearAllTags = jest.fn();
    render(<SelectedTags selectedTags={selectedTags} handleTagDelete={handleTagDelete} handleClearAllTags={handleClearAllTags} />);
    const deleteIcon = screen.getAllByAltText('Delete Tag')[0];
    fireEvent.click(deleteIcon);
    expect(handleTagDelete).toHaveBeenCalledWith('Tag 1');
  });

  it('calls the handleClearAllTags function when the "Clear All" button is clicked', () => {
    const selectedTags = ['Tag 1', 'Tag 2'];
    const handleTagDelete = jest.fn();
    const handleClearAllTags = jest.fn();
    render(<SelectedTags selectedTags={selectedTags} handleTagDelete={handleTagDelete} handleClearAllTags={handleClearAllTags} />);
    const clearAllButton = screen.getByText('Clear All');
    fireEvent.click(clearAllButton);
    expect(handleClearAllTags).toHaveBeenCalled();
  });
});

describe('SuggestedCard', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('renders the loading state initially', () => {
    render(<SuggestedCard />);
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  it('fetches and renders company data', async () => {
    const mockCompanyData = [
      {
        _id: '1',
        name: 'Sample Company',
        foundingDate: '2010',
        notableInvestors: 'Investor A, Investor B',
        hq: 'San Francisco, CA',
        totalFunding: '$10M',
        founders: [
          {
            _id: '1',
            name: 'John Doe',
            position: 'CEO',
          },
          {
            _id: '2',
            name: 'Jane Smith',
            position: 'CTO',
          },
        ],
        alumnis: [
          {
            _id: '1',
            name: 'Alice Johnson',
          },
          {
            _id: '2',
            name: 'Bob Williams',
          },
        ],
        bio: 'This is a sample company.',
        ezenLink: 'https://equityzen.com/company/samplecompany/',
        industries: [
            "Industry 1",
            "Industry 2",
            "Industry 3"
        ],
        favorite: false
      },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCompanyData,
    });

    const fetchCompanyData = jest.fn();
    const setSuccessMessage = jest.fn();
    render(<SuggestedCard
    companyData={mockCompanyData}
    fetchCompanyData={fetchCompanyData}
    setSuccessMessage={setSuccessMessage}
    />);

    await waitFor(() => {
      const companyName = screen.getByText('Sample Company');
      expect(companyName).toBeInTheDocument();
    });
  });
});