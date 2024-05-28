'use client';
import styles from "@components/Card/Card.module.scss";
import React from "react";

export default function DropDown ({ selectedOption, handleDropDownSelect }) {

    const selectStyle = {
        margin: '20px 0'
    };

    return (
        <div className={styles.rowCol}>
            <h4 style={selectStyle}>Sort By</h4>
            <div className={styles.Header}>
                <select
                    value={selectedOption}
                    onChange={handleDropDownSelect}
                    className={styles.DropDown}
                >
                    <option value="All">All</option>
                    <option value="highest-funding">Highest Funding</option>
                    <option value="companies-with-alumni">Companies With Alumni</option>
                    <option value="california">Companies In California</option>
                    <option value="newest-companies">Newest Companies</option>
                    <option value="favorites">Favorites</option>
                </select>
            </div>
        </div>
    );
}
