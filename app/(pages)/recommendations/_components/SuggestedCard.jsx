'use client';
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '@components/Card/Card.module.scss';
import layout from '@components/Layout/Layout.module.scss';

export default function SuggestedCard() {
    const [companyData, setCompanyData] = useState(null);
    const chartRefs = useRef({});

    useEffect(() => {
        fetchCompanyData();
    }, []);

    const fetchCompanyData = async () => {
        try {
            const response = await fetch(
                "https://webtools-api.engr.ucdavis.edu/equity-zen/"
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

    useEffect(() => {
        if (companyData) {
            renderFundingCharts();
        }
    }, [companyData]);

    const renderFundingCharts = () => {
      companyData.forEach(company => {
          const fundingByYear = {};
          company.fundingRecord.forEach(record => {
              const year = record.period.split(' ')[1];
              if (!fundingByYear[year]) {
                  fundingByYear[year] = 0;
              }
              fundingByYear[year] += parseFloat(record.amount.replace('$', '').replace('M', '')) * 1000000;
          });
  
          const years = Object.keys(fundingByYear);
          const amounts = Object.values(fundingByYear);
  
          const canvasId = `fundingChart_${company._id}`;
          const ctx = chartRefs.current[company._id]?.getContext('2d');
          if (ctx) {
              Chart.getChart(ctx)?.destroy();
          }
          chartRefs.current[company._id] = ctx;
  
          new Chart(ctx, {
              type: 'line',
              data: {
                  labels: years,
                  datasets: [{
                      label: 'Funding History',
                      data: amounts,
                      fill: false,
                      borderColor: 'rgb(154, 173, 194)',
                      tension: 0.1,
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
      });
  };
  

    if (!companyData) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.RowCol}>
          <h4> Suggested Companies with Davis Alumnis </h4>
            {companyData.map(company => (
                <div key={company._id} className={layout.ColRow}>
                    <div className={styles.black}>
                        <h4>{company.name}</h4>
                        <span className={styles.line}></span>
                        <div className={layout.align}> 
                          <canvas id={`fundingChart_${company._id}`} width="400" height="150" ref={(el) => (chartRefs.current[company._id] = el)} />
                          <div className={styles.row}>
                            <div style={{ backgroundColor: 'rgb(154, 173, 194)', width: '8px', height: '8px', display: 'inline-block', 
                            marginRight: '5px', borderRadius: '15px' }}></div>
                            <p>Funding History</p>
                          </div>
                        </div>
                    </div>
                    <div className={styles.lightblue}>
                        <p>{company.bio}</p>
                        <p><span className={styles.underline}>Founded:</span> {company.foundingDate}</p>
                        <p><span className={styles.underline}>Notable Investors:</span> {company.notableInvestors}</p>
                        <p><span className={styles.underline}>Headquarters:</span> {company.hq}</p>
                        <p><span className={styles.underline}>Total Funding:</span> {company.totalFunding}</p>
                        <p className={styles.bold}>Management:</p>
                        {company.founders ? (
                            company.founders.map(founder => (
                                <p key={founder._id}><span className={styles.underline}>{founder.position}:</span> {founder.name}</p>
                            ))
                        ) : (
                            <p>No management information available.</p>
                        )}
                        <p className={styles.bold}>UC Davis Alumni within the company:</p>
                        {company.alumnis !== null ? (
                            company.alumnis.map(alumni => (
                                <p key={alumni._id}>{alumni.name}</p>
                            ))
                        ) : (
                            <p>No UC Davis Alumni found within the company.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
