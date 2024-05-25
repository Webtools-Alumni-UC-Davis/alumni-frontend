import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../directory/_components/Header';
import SearchForm from '../directory/_components/SearchForm/SearchForm';
import SelectedTags from '../directory/_components/SelectedTags/SelectedTags';
import GraduationYearForm from '../directory/_components/GraduationYearForm/GraduationYearForm';
import AlumniList from '../directory/_components/AlumniList/AlumniList';
import Pagination from '../directory/_components/Pagination/Pagination';

describe('Header', () => {
  it('renders the header text correctly', () => {
    render(<Header />);
    const headerText = screen.getByText('Alumni Directory');
    expect(headerText).toBeInTheDocument();
  });
});

describe('SearchForm', () => {
  it('renders the search form correctly', () => {
    const handleSearchSubmit = jest.fn();
    render(<SearchForm handleSearchSubmit={handleSearchSubmit} />);
    const searchInput = screen.getByPlaceholderText('Search alumni by title, keyword, or company');
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

describe('GraduationYearForm', () => {
  it('renders the graduation year form correctly', () => {
    const handleYearSubmit = jest.fn();
    render(<GraduationYearForm handleYearSubmit={handleYearSubmit} />);
    const yearInput = screen.getByPlaceholderText('2024');
    const submitButton = screen.getByText('Submit Year');
    expect(yearInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('calls the handleYearSubmit function when the form is submitted', () => {
    const handleYearSubmit = jest.fn();
    render(<GraduationYearForm handleYearSubmit={handleYearSubmit} />);
    const submitButton = screen.getByText('Submit Year');
    fireEvent.click(submitButton);
    expect(handleYearSubmit).toHaveBeenCalled();
  });
});

describe('AlumniList', () => {
  it('renders the alumni data correctly', () => {
    const alumniData = [
      {
        name: 'John Doe',
        url: 'https://www.linkedin.com/in/johndoe',
        job: 'Software Engineer',
        company: 'Acme Inc.',
        otherEducation: 'University of California, Berkeley',
        location: 'San Francisco, CA',
        graduationYear: 2015,
        major: 'Computer Science',
      },
    ];
    render(<AlumniList alumniData={alumniData} />);
    const alumniName = screen.getByText('John Doe (ID: johndoe)');
    const alumniJob = screen.getByText('Software Engineer');
    const alumniCompany = screen.getByText('Acme Inc.');
    const alumniOtherEducation = screen.getByText('University of California, Berkeley');
    const alumniLocation = screen.getByText('San Francisco, CA');
    const alumniGraduationYear = screen.getByText('2015');
    const alumniMajor = screen.getByText('Computer Science');
    expect(alumniName).toBeInTheDocument();
    expect(alumniJob).toBeInTheDocument();
    expect(alumniCompany).toBeInTheDocument();
    expect(alumniOtherEducation).toBeInTheDocument();
    expect(alumniLocation).toBeInTheDocument();
    expect(alumniGraduationYear).toBeInTheDocument();
    expect(alumniMajor).toBeInTheDocument();
  });
});

describe('Pagination', () => {
  it('renders the pagination correctly', () => {
    const handlePageChange = jest.fn();
    render(<Pagination currentPage={3} totalPages={10} handlePageChange={handlePageChange} />);
    const prevButton = screen.getByText('Prev');
    const page1 = screen.getByText('1');
    const dots1 = screen.getByText('...');
    const page2 = screen.getByText('2');
    const page3 = screen.getByText('3');
    const page4 = screen.getByText('4');
    const dots2 = screen.getByText('...');
    const page10 = screen.getByText('10');
    const nextButton = screen.getByText('Next');
    expect(prevButton).toBeInTheDocument();
    expect(page1).toBeInTheDocument();
    expect(dots1).toBeInTheDocument();
    expect(page2).toBeInTheDocument();
    expect(page3).toBeInTheDocument();
    expect(page4).toBeInTheDocument();
    expect(dots2).toBeInTheDocument();
    expect(page10).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('calls the handlePageChange function when a page number is clicked', () => {
    const handlePageChange = jest.fn();
    render(<Pagination currentPage={3} totalPages={10} handlePageChange={handlePageChange} />);
    const page5 = screen.getByText('4');
    fireEvent.click(page5);
    expect(handlePageChange).toHaveBeenCalledWith(4);
  });
});