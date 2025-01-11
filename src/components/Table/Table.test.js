import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table';

jest.mock('../../utilis/data', () => ({
  WebUrl: 'mock-url',
}));

global.fetch = jest.fn();

describe('Table Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the table component', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { "s.no": 1, "percentage.funded": "75%", "amt.pledged": "$1000" },
        { "s.no": 2, "percentage.funded": "50%", "amt.pledged": "$500" },
      ],
    });

    render(<Table />);
    expect(await screen.findByText('S.No')).toBeInTheDocument();
    expect(screen.getByText('Percentage funded')).toBeInTheDocument();
    expect(screen.getByText('Amount Pledged')).toBeInTheDocument();
  });

  it('fetches and displays data correctly', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { "s.no": 1, "percentage.funded": "75%", "amt.pledged": "$1000" },
        { "s.no": 2, "percentage.funded": "50%", "amt.pledged": "$500" },
      ],
    });

    render(<Table />);
    expect(await screen.findByText('$1000')).toBeInTheDocument();
    expect(screen.getByText('$500')).toBeInTheDocument();
  });

  it('should display message when there is no data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<Table />);
    expect(await screen.findByText('No data available')).toBeInTheDocument();
  });

  it('should paginates correctly', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => Array.from({ length: 20 }, (_, i) => ({
        "s.no": i + 1,
        "percentage.funded": `${i * 5}%`,
        "amt.pledged": `$${i * 100}`,
      })),
    });
    render(<Table />);
    expect(await screen.findByText('S.No')).toBeInTheDocument();

    expect(screen.getByText('$0')).toBeInTheDocument();
    const paginationItems = screen.getAllByRole('listitem');
    fireEvent.click(paginationItems[1]);    
    expect(screen.getByText('$500')).toBeInTheDocument();
  });
});
