import React from "react";
import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";
const landingPage = () =>{
    return(
       <div className={styles.background}>
        <h1 className={styles.tittle}>Home</h1>
        <div className={styles.conteiner}>
            <Link to={'/home'}>
                <button className={styles.button}>HOME</button>
                </Link>
        </div>
       </div> 
    )
}

export default landingPage;