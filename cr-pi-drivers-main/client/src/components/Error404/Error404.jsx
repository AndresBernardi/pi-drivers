import React from 'react';
import { Link } from 'react-router-dom';
import styles from './error.module.css'


const Error404 = () => {
    return (
        <div className={styles.page}>
            <h3 className={styles.error}>Error 404, Page not found</h3>
            <div className={styles.goBack}>
                <h1 className={styles.h1}>Go back Home!</h1>
                <Link to='/home'>
                    <button className={styles.button}>HOME</button>
                </Link>
            </div>     
        </div>
    );
};

export default Error404;