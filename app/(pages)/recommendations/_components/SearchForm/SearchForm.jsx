import React from 'react';
import styles from './SearchForm.module.scss';

export default function SearchForm({ searchQuery, handleSearchChange, handleSearchSubmit, searchQueryError, successMessage  }) {
    return (
        <form onSubmit={handleSearchSubmit}>
            <div className={styles.searchcontainer}>
                <div className={styles.searchbar}>
                    <p> Search </p>
                    <div className={styles.row}>
                        <input
                            type="text"
                            placeholder="Search company by name, state, year, investor, and industry"
                            className={styles.search}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className={styles.button} type="submit">Submit Search</button>
                    </div>
                    {searchQueryError && <p className={styles.error}>{searchQueryError}</p>}
                    {successMessage && <p className={styles.success}>{successMessage}</p>}
                </div>
            </div>
        </form>
    );
}
