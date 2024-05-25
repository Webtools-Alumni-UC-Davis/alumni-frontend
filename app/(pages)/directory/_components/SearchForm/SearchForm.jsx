import React from 'react';
import styles from './SearchForm.module.scss';

export default function SearchForm({ searchQuery, handleSearchChange, handleSearchSubmit, searchQueryError }) {
    return (
        <form onSubmit={handleSearchSubmit}>
            <div className={styles.searchcontainer}>
                <div className={styles.searchbar}>
                    <p> Search </p>
                    <div className={styles.row}>
                        <input
                            type="text"
                            placeholder="Search alumni by title, keyword, or company"
                            className={styles.search}
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button className={styles.button} type="submit">Submit Search</button>
                    </div>
                    {searchQueryError && <p className={styles.error}>{searchQueryError}</p>}
                </div>
            </div>
        </form>
    );
}
