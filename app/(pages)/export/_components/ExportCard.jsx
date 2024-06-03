'use client'
import styles from '@components/Card/Card.module.scss';
import { CSVLink } from 'react-csv';
import { useState, useEffect } from 'react';

export default function ExportCard() {
  const [alumniData, setAlumniData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
            "https://webtools-api.engr.ucdavis.edu/alumnis/allalumni"
        );
        const data = await response.json();
        setAlumniData(data);
      } catch (error) {
        console.error('Error fetching alumni data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.lightblue}>
      <p>Export Data Into A CSV File Here:</p>
      {isLoading && <p>Loading...</p>}
      {!isLoading && alumniData.length > 0 && (
        <CSVLink
          data={alumniData}
          filename={'alumni_data.csv'}
          className={styles.button}
          style={{ marginTop: '1%' }}
        >
          Download CSV
        </CSVLink>
      )}
    </div>
  );
}