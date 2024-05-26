'use client';
import { useState, useEffect } from 'react';
import styles from '@components/Card/Card.module.scss';

export default function YearAlumni() {
    const [alumniCount, setAlumniCount] = useState(null);
  
    useEffect(() => {
      fetch("https://alumni-backend-6954.onrender.com/alumnis/count/current")
          .then((response) => response.json())
          .then((data) => {
              setAlumniCount(data.count);
          })
          .catch((error) => {
              console.error("Error fetching alumni count:", error);
          });
    }, []);
  
    return (
      <div className={styles.darkblue}>
        <p>This Year Alumni Count</p>
        <h4>{alumniCount !== null ? alumniCount : 'Loading...'}</h4>
      </div>
    );
  }