import React from 'react';
import { render, screen, waitFor, userEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../settings/_components/Header';
import Subscription from '../settings/_components/Subscription/Subscription';

global.fetch = jest.fn();

describe('Header', () => {
  it('renders header', () => {
    render(<Header />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});

describe('Subscription', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    it('renders the loading state initially', () => {
        render(<Subscription />);
        const loadingText = screen.getByText('Loading...');
        expect(loadingText).toBeInTheDocument();
    });

    it('fetches and displays the subscription status', async () => {
        const mockSubscribed = true;
        global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ subscribed: mockSubscribed }),
        });

        render(<Subscription />);

        await waitFor(() => {
        const subscribedText = screen.getByText(mockSubscribed ? 'Subscribed' : 'Unsubscribed');
        expect(subscribedText).toBeInTheDocument();
        });
    });
});