"use client";
import React, { useState, useEffect } from 'react';
import styles from "./Search.module.scss";
import SearchForm from './SearchForm/SearchForm';
import GraduationYearForm from './GraduationYearForm/GraduationYearForm';
import SelectedTags from './SelectedTags/SelectedTags';
import AlumniList from './AlumniList/AlumniList';
import Pagination from './Pagination/Pagination';

export default function Search() {
    const [graduationYear, setGraduationYear] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [graduationYearError, setGraduationYearError] = useState('');
    const [searchQueryError, setSearchQueryError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [alumniData, setAlumniData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedTags, setSelectedTags] = useState([]);
    const [url, setUrl] = useState('');

    useEffect(() => {
        fetchAlumniData();
    }, [currentPage, searchQuery, graduationYear, selectedTags]);

    const fetchAlumniData = async () => {
        try {
            const baseUrl =
                "https://webtools-api.engr.ucdavis.edu/alumnis/search";
            const params = new URLSearchParams();
            params.append('page', currentPage);
            if (searchQuery.trim() !== '') {
                params.append('keyword', searchQuery);
            }
            if (graduationYear.trim() !== '') {
                params.append('graduationYear', graduationYear);
            }
            if (selectedTags.length > 0) {
                params.append('filters', JSON.stringify(selectedTags));
            }
    
            const finalUrl = `${baseUrl}?${params.toString()}`;

            const response = await fetch(finalUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch alumni data');
            }
            const data = await response.json();
            setAlumniData(data.data);
            setTotalPages(data.pagination.total_pages);
        } catch (error) {
            console.error('Error fetching alumni data:', error.message);
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery === '') {
            setSearchQueryError('Please enter a non-empty search query.');
        } else if (!/^[a-zA-Z\s]*$/.test(trimmedQuery)) {
            setSearchQueryError('Please enter only letters and spaces.');
        } else {
            setSearchQueryError('');
            setSelectedTags([...selectedTags, trimmedQuery]);
            setSearchQuery('');
            setCurrentPage(1);
        }
    };
    
    const handleYearSubmit = (event) => {
        event.preventDefault();
        const year = parseInt(event.target.value, 10);
        if (year < 1900 || year > new Date().getFullYear()) {
            setGraduationYearError('Please enter a valid year between 1900 and the current year.');
        } else {
            setGraduationYearError('');
            setCurrentPage(1);
        }
    };    

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleYearChange = (event) => {
        setGraduationYear(event.target.value);
    };

    const handleTagDelete = (tag) => {
        setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
    };

    const handleClearAllTags = () => {
        setSelectedTags([]);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <SearchForm 
               handleSearchSubmit={handleSearchSubmit} 
               handleSearchChange={handleSearchChange} 
               searchQuery={searchQuery} 
               searchQueryError={searchQueryError} 
            />
            <GraduationYearForm 
                handleYearSubmit={handleYearSubmit} 
                handleYearChange={handleYearChange} 
                graduationYear={graduationYear} 
                graduationYearError={graduationYearError}
            />
            <SelectedTags 
                selectedTags={selectedTags} 
                handleTagDelete={handleTagDelete} 
                handleClearAllTags={handleClearAllTags} 
            />
            <div className={styles.resultcontainer}>
                <div className={styles.lightblue}>
                    <AlumniList alumniData={alumniData} />
                </div>
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    handlePageChange={handlePageChange} 
                />
            </div>
        </div>
    );
}