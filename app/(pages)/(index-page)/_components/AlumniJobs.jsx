'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Chart from 'chart.js/auto';
import styles from '@components/Card/Card.module.scss';

export default function AlumniJobs() {
  const [jobData, setJobData] = useState([]);
  const chartRef = useRef(null);
  const backgroundColors = ['#62B2FD', '#9BDFC4', '#F99BAB', '#FFB44F', '#9F97F7']; 

  useEffect(() => {
    // Fetch the top 5 jobs data
    fetch("https://webtools-api.engr.ucdavis.edu/alumnis/top-5-jobs")
        .then((response) => response.json())
        .then((data) => {
            setJobData(data);
        })
        .catch((error) => {
            console.error("Error fetching top 5 jobs data:", error);
        });
  }, []);

  useEffect(() => {
    // Draw the bar chart when jobData changes
    if (jobData.length > 0) {
      const labels = jobData.map(job => job._id);
      const counts = jobData.map(job => job.count);
      const backgroundColors = ['#62B2FD', '#9BDFC4', '#F99BAB', '#FFB44F', '#9F97F7'];

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('jobChart');
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
  }, [jobData]);

  return (
    <div className={styles.black} data-testid="alumni-jobs">
        <div className={styles.row} style={{ justifyContent: 'space-between' }}>
            <h4>Alumni Jobs</h4>
            <Link href="/export">
                <div className={styles.button}>View Report</div>
            </Link>
        </div>
      <span className={styles.line}></span>
      <canvas id="jobChart" width="400" height="150"></canvas>
      <div className={styles.flexwrap}>
        {jobData.map((job, index) => (
            <div class={styles.row}key={job._id}>
            <div style={{ backgroundColor: backgroundColors[index], width: '8px', height: '8px', display: 'inline-block', marginRight: '5px', borderRadius: '15px' }}></div>
            <p style={{ color: backgroundColors[index] }}>{job._id}</p>
            </div>
        ))}
    </div>
    </div>
  );
}
