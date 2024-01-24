import React from 'react';
import style from './Landing.module.css';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className={style.landingContainer}>
            <div className={style.overlay}>
                <h1 className={style.title}>Bienvenido a mi proyecto</h1>
                <h3 className={style.subtitle}>Toca el boton de abajo para ir al Home!</h3>
                <Link to="/home">
                    <button className={style.exploreButton}>Ir a Home!</button>
                </Link>
            </div>
        </div>
    )
}