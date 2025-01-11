import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

const mockOnPageChange = jest.fn();

describe('Pagination component', () => {
  beforeEach(() => {
    mockOnPageChange.mockClear();  
  });

  test('should render the correct number of pagination items', () => {
    render(
      <Pagination
        onPageChange={mockOnPageChange}
        totalCount={50}
        siblingCount={1}
        currentPage={1}
        pageSize={5}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();   
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('should highlights the current page when selected', () => {
    render(
      <Pagination
        onPageChange={mockOnPageChange}
        totalCount={50}
        siblingCount={1}
        currentPage={2}
        pageSize={5}
      />
    );
    const page2 = screen.getByText('2');
    expect(page2).toHaveClass('selected');
    
    const page1 = screen.getByText('1');
    expect(page1).not.toHaveClass('selected');
  });

  test('clicking on a page number should triggers the onPageChange function with the correct page', () => {
    render(
      <Pagination
        onPageChange={mockOnPageChange}
        totalCount={50}
        siblingCount={1}
        currentPage={1}
        pageSize={5}
      />
    );
    fireEvent.click(screen.getByText('2'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('clicking the "Next" button triggers the onPageChange function with the next page', () => {
    render(
      <Pagination
        onPageChange={mockOnPageChange}
        totalCount={50}
        siblingCount={1}
        currentPage={1}
        pageSize={5}
      />
    );

    fireEvent.click(screen.getByRole('button',{name:/next/i}));
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('clicking the "Previous" button triggers the onPageChange function with the previous page', () => {
    render(
      <Pagination
        onPageChange={mockOnPageChange}
        totalCount={50}
        siblingCount={1}
        currentPage={2}
        pageSize={5}
      />
    );

    fireEvent.click(screen.getByRole('button',{name:/previous/i}));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test('does not render "Previous" button when on the first page', () => {
    render(
      <Pagination
        onPageChange={mockOnPageChange}
        totalCount={50}
        siblingCount={1}
        currentPage={1}
        pageSize={5}
      />
    );
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
  });

  test('does not render "Next" button when on the last page', () => {
    render(
      <Pagination
        onPageChange={mockOnPageChange}
        totalCount={50}
        siblingCount={1}
        currentPage={Math.ceil(50 / 5)} 
        pageSize={5}
      />
    );
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });

  test('renders correct pagination for totalCount less than pageSize', () => {
    render(
      <Pagination
        onPageChange={mockOnPageChange}
        totalCount={4}
        siblingCount={1}
        currentPage={1}
        pageSize={5}
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });

  test('renders correct pagination when there are no pages to show', () => {
    render(
      <Pagination
        onPageChange={mockOnPageChange}
        totalCount={0}
        siblingCount={1}
        currentPage={1}
        pageSize={5}
      />
    );
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });
});
