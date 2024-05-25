'use client';
import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '@components/Card/Card.module.scss';

export default function TopCompanies() {
  const [companyData, setCompanyData] = useState([]);
  const chartRef = useRef(null);
  const backgroundColors = ['#62B2FD', '#9BDFC4', '#F99BAB', '#FFB44F', '#9F97F7'];

  useEffect(() => {
    // Fetch the top 5 companies data
    fetch("https://webtools-api.engr.ucdavis.edu/alumnis/top-5-companies")
        .then((response) => response.json())
        .then((data) => {
            setCompanyData(data);
        })
        .catch((error) => {
            console.error("Error fetching top 5 companies data:", error);
        });
  }, []);

  useEffect(() => {
    // Draw the bar chart when companyData changes
    if (companyData.length > 0) {
      const labels = companyData.map(company => company._id);
      const counts = companyData.map(company => company.count);

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('companyChart');
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
  }, [companyData]);

  return (
    <div className={styles.darkblue}>
      <h4>Top Companies</h4>
      <span className={styles.line}></span>
      <canvas id="companyChart" width="400" height="150" data-testid="companyChart"></canvas>
      <div className={styles.flexwrap}>
        {companyData.map((company, index) => (
            <div className={styles.row} key={company._id}>
              <div style={{ backgroundColor: backgroundColors[index], width: '8px', height: '8px', display: 'inline-block', marginRight: '5px', borderRadius: '15px' }}></div>
              <p style={{ color: backgroundColors[index] }}>{company._id}</p>
            </div>
        ))}
      </div>
    </div>
  );
}
