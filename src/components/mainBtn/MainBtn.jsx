import React from 'react';
import styles from './MainBtn.module.css';

const MainBtnComponent = ({ borderRadius, content, width }) => {
    const btnStyle = {
        borderRadius: borderRadius,
        width: width,
    };

    return (
        <button className={styles.mainBtn} style={btnStyle}>
            {content}
        </button>
    );
};

export default MainBtnComponent;
