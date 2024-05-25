import React from 'react';
import Image from 'next/image';
import styles from './SelectedTags.module.scss';

export default function SelectedTags({ selectedTags, handleTagDelete, handleClearAllTags }) {
    const renderClearAllButton = () => {
        if (selectedTags.length > 0) {
            return (
                <div className={styles.clear} onClick={handleClearAllTags}>
                    <p> Clear All </p>
                </div>
            );
        }
        return null;
    };

    const renderSelectedTags = () => {
        return selectedTags.map(tag => (
            <div key={tag} className={styles.tag}>
                {tag}
                <div className={styles.exit} onClick={() => handleTagDelete(tag)}>
                    <Image
                        src="/index/Exit.png"
                        width={20}
                        height={20}
                        alt="Delete Tag"
                    />
                </div>
            </div>
        ));
    };

    return (
        <div className={styles.tagcontainer}>
            {renderSelectedTags()}
            {renderClearAllButton()}
        </div>
    );
}