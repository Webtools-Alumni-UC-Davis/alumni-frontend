'use client';
import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '@components/Card/Card.module.scss';

export default function AlumniLocations() {
  const [locationData, setLocationData] = useState([]);
  const chartRef = useRef(null);
  const backgroundColors = ['#62B2FD', '#9BDFC4', '#F99BAB', '#FFB44F', '#9F97F7'];

  useEffect(() => {
    // Fetch the top 5 locations data
    fetch("https://webtools-api.engr.ucdavis.edu/alumnis/top-5-locations")
        .then((response) => response.json())
        .then((data) => {
            setLocationData(data);
        })
        .catch((error) => {
            console.error("Error fetching top 5 locations data:", error);
        });
  }, []);

  useEffect(() => {
    // Draw the bar chart when locationData changes
    if (locationData.length > 0) {
      const labels = locationData.map(location => location._id);
      const counts = locationData.map(location => location.count);

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('locationChart');
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: counts,
            backgroundColor: backgroundColors,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              display: true,
              color: '#FFFFFF',
              grid: {
                color: '#FFFFFF'
              },
              ticks: {
                color: '#FFFFFF' 
              }
            },
            x: {
              display: true,
              grid: {
                color: '#FFFFFF'
              },
              ticks: {
                display: false, 
              },
            }
          },
          plugins: {
            legend: {
              display: false,
            }
          }
        }
      });
    }
  }, [locationData]);

  return (
    <div className={styles.black}>
      <h4>Top Alumni Locations</h4>
      <span className={styles.line}></span>
      <canvas id="locationChart" width="400" height="150" data-testid="locationChart"></canvas>
      <div className={styles.flexwrap}>
        {locationData.map((location, index) => (
            <div className={styles.row} key={location._id}>
              <div style={{ backgroundColor: backgroundColors[index], width: '8px', height: '8px', display: 'inline-block', marginRight: '5px', borderRadius: '15px' }}></div>
              <p style={{ color: backgroundColors[index] }}>{location._id}</p>
            </div>
        ))}
      </div>
    </div>
  );
}
