'use client'
import styles from '@components/Card/Card.module.scss';
import { CSVLink } from 'react-csv';
import { useState } from 'react';

export default function ExportCard() {
    const [alumniData, setAlumniData] = useState([]);

    const handleExport = async () => {
        try {
            const response = await fetch(
                "https://webtools-api.engr.ucdavis.edu/alumnis/allalumni"
            );
            const data = await response.json();
            console.log(data);
            setAlumniData(data);
        } catch (error) {
            console.error('Error fetching alumni data:', error);
        }
    };

    return (
        <div className={styles.lightblue}>
            <p>Export Data Into A CSV File Here:</p>
            <CSVLink  asyncOnClick={true} onClick={handleExport} data={alumniData} filename={'alumni_data.csv'} className={styles.button} style={{ marginTop: '1%' }}>
                Download CSV
            </CSVLink>
        </div>
    );
}
