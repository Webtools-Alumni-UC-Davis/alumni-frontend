'use client'

import SuggestedCard from "./SuggestedCard";
import SearchForm from "./SearchForm/SearchForm";
import DropDown from "./DropDown";
import SelectedTags from "./SelectedTags/SelectedTags";
import React, {useEffect, useState} from "react";

export default function Recommendations () {

    const [selectedTags, setSelectedTags] = useState([]);
    const [searchQueryError, setSearchQueryError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [companyData, setCompanyData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('All');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchCompanyData();
    }, [searchQuery, selectedTags, selectedOption]);

    const fetchCompanyData = async() => {
        try {
            let baseUrl = "https://alumni-backend-6954.onrender.com/equity-zen/search"

            const params = new URLSearchParams();

            if (searchQuery.trim() !== '') {
                params.append('keyword', searchQuery)
            }

            if (selectedTags.length > 0) {
                params.append('filters', JSON.stringify(selectedTags));
            }

            if (selectedOption !== 'All') {
                params.append('sort', selectedOption);
            }

            const finalUrl = `${baseUrl}?${params.toString()}`;

            const response = await fetch(finalUrl)

            if (!response.ok) {
                throw new Error(`Fetching company data failed`);
            }

            const data = await response.json();
            setCompanyData(data);
        } catch (e) {
            console.error("Fetching company data failed: ", e.message);
        }
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery === '') {
            setSearchQueryError('Please enter a non-empty search query.');
        } else if (!/^[a-zA-Z0-9\s]*$/.test(trimmedQuery)) {
            setSearchQueryError('Please enter only letters, numbers, and spaces.');
        } else {
            setSearchQueryError('');
            setSelectedTags([...selectedTags, trimmedQuery]);
            setSearchQuery('');
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDropDownSelect = (event) => {
        setSelectedOption(event.target.value);
    }

    const handleTagDelete = (tag) => {
        setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
    };

    const handleClearAllTags = () => {
        setSelectedTags([]);
    };

    return (
        <div>
            <DropDown
                selectedOption={selectedOption}
                handleDropDownSelect={handleDropDownSelect}
            />

            <SelectedTags
                selectedTags={selectedTags}
                handleTagDelete={handleTagDelete}
                handleClearAllTags={handleClearAllTags}
            />

            <SearchForm
                handleSearchSubmit={handleSearchSubmit}
                handleSearchChange={handleSearchChange}
                searchQuery={searchQuery}
                searchQueryError={searchQueryError}
                successMessage={successMessage}
            />

            <SuggestedCard
                companyData={companyData}
                fetchCompanyData={fetchCompanyData}
                setSuccessMessage={setSuccessMessage}
            />
        </div>
    )
}
