'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '@components/Card/Card.module.scss';
import layout from '@components/Layout/Layout.module.scss';

export default function SuggestedCard() {
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        fetchCompanyData();
    }, []);

    const fetchCompanyData = async () => {
        try {
            const response = await fetch(
                "http://localhost:3002/equity-zen/"
            );
            if (!response.ok) {
                throw new Error('Failed to fetch company data');
            }
            const data = await response.json();
            setCompanyData(data);
        } catch (error) {
            console.error('Error fetching company data:', error.message);
        }
    };


    if (!companyData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.RowCol}>
            {companyData.map(company => (
                <div key={company._id} className={layout.ColRow}>
                    <div className={styles.lightblue}>
                        <h3>
                            <a href={company.ezenLink} target="_blank" rel="noopener noreferrer">
                                {company.name}
                            </a>
                        </h3>
                        <p>{company.bio}</p>
                        <p><span className={styles.underline}>Founded:</span> {company.foundingDate}</p>
                        <p><span className={styles.underline}>Notable Investors:</span> {company.notableInvestors}</p>
                        <p><span className={styles.underline}>Headquarters:</span> {company.hq}</p>
                        <p><span className={styles.underline}>Total Funding:</span> {company.totalFunding}</p>
                        <p className={styles.bold}>Industries:</p>
                        {company.industries && company.industries.length > 0 ? (
                            <p>{company.industries.join(', ')}</p>
                        ) : (
                            <p>No industry information available.</p>
                        )}
                        <p className={styles.bold}>Management:</p>
                        {company.founders ? (
                            company.founders.map(founder => (
                                <p key={founder._id}><span className={styles.underline}>{founder.position}:</span> {founder.name}</p>
                            ))
                        ) : (
                            <p>No management information available.</p>
                        )}
                    </div>
                    <div className={styles.black}>
                        <h4 className={styles.bold}>UC Davis Alumni within the company:</h4>
                        <span className={styles.line}></span>
                        {company.alumnis !== null ? (
                            company.alumnis.map(alumni => (
                                <p key={alumni._id}><a href={alumni.url} target="_blank" rel="noopener noreferrer">
                                    {alumni.name} - {alumni.position}
                                </a> </p>
                            ))
                        ) : (
                            <p>No UC Davis Alumni found within the company.</p>
                        )}
                        <div className={layout.align}>
                            <canvas width="400" height="150" />
                            <div className={styles.row}>
                                <div style={{ backgroundColor: 'rgb(154, 173, 194)', marginRight: '5px'}}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.RowCol}>
                        <div className={`${styles.button} ${styles.favorite}`}>
                            <p>Favorite</p>
                        </div>
                        <div className={`${styles.button} ${styles.delete}`}>
                            <h5>Delete</h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
