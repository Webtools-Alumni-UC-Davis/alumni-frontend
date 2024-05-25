import React from 'react';
import styles from './AlumniList.module.scss';

export default function AlumniList({ alumniData }) {
    const extractUsername = (url) => {
        const pattern = /\/in\/([^/]+)/;
        const match = url.match(pattern);
        return match ? match[1] : '';
    };

    const renderAlumniData = () => {
        if (alumniData.length === 0) {
            return <h4>Loading...</h4>;
        } else {
            return alumniData.map((alumni, index) => (
                <div key={index} className={styles.content}>
                    <h4 className={styles.underline}>
                        <a
                            href={alumni.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            {alumni.name} (ID: {extractUsername(alumni.url)})
                        </a>
                    </h4>
                    <div className={styles.intel}>
                        <div className={styles.intelcolumn}>
                            <span>
                                <span className={styles.bold}>Work: </span> {alumni.job}
                            </span>
                            <span>
                                <span className={styles.bold}>Company: </span> {alumni.company}
                            </span>
                            <span>
                                <span className={styles.bold}>Other Education: </span> {alumni.otherEducation}
                            </span>
                        </div>
                        <div className={styles.intelcolumn}>
                            <span>
                                <span className={styles.bold}>Location: </span> {alumni.location}
                            </span>
                            <span>
                                <span className={styles.bold}>Graduation Year: </span> {alumni.graduationYear}
                            </span>
                            <span>
                                <span className={styles.bold}>Major: </span> {alumni.major}
                            </span>
                        </div>
                    </div>
                    <div className={styles.line}></div>
                </div>
            ));
        }
    };

    return (
        <div className={styles.contentcontainer}>
            {renderAlumniData()}
        </div>
    );
}