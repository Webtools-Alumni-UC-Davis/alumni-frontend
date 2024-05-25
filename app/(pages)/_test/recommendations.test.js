import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../recommendations/_components/Header';
import SuggestedCard from '../recommendations/_components/SuggestedCard';

describe('Header', () => {
  it('renders the header text correctly', () => {
    render(<Header />);
    const headerText = screen.getByText('Recommendations');
    expect(headerText).toBeInTheDocument();
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
        bio: 'This is a sample company.',
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
        fundingRecord: [
          {
            period: '2010',
            amount: '$1M',
          },
          {
            period: '2012',
            amount: '$3M',
          },
          {
            period: '2015',
            amount: '$6M',
          },
        ],
      },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCompanyData,
    });

    render(<SuggestedCard />);

    await waitFor(() => {
      const companyName = screen.getByText('Sample Company');
      expect(companyName).toBeInTheDocument();
    });
  });
});