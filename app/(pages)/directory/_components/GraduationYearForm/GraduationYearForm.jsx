import React from 'react';
import styles from './GraduationYearForm.module.scss';

export default function GraduationYearForm({ graduationYear, handleYearChange, handleYearSubmit, graduationYearError }) {
    return (
        <form onSubmit={handleYearSubmit}>
            <div className={styles.graduationcontainer}>
                <p> Graduation Year </p>
                <div className={styles.row}>
                    <input
                        type="number"
                        placeholder="2024"
                        min="1900"
                        className={styles.graduation}
                        value={graduationYear}
                        onChange={handleYearChange}
                    />
                    <button className={styles.button} type="submit">Submit Year</button>
                </div>
                {graduationYearError && <p className={styles.error}>{graduationYearError}</p>}
            </div>
        </form>
    );
}
