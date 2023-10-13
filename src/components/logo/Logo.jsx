import React from 'react';
import styles from './Logo.module.css';
import Logo from '../../assets/images/beatbox-logo.png';

const LogoComponent = () => {
    return (
        <div className={styles.logo}>
            <img src={Logo} alt="Beatbox Logo" className={styles.logoImage} />
            {"  "}
            BEATBOX
        </div>
    );
};

export default LogoComponent;
