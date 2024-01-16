import React from 'react';
import styles from './pagination.module.css'

const Pagination = ({nPages, currentPage, setCurrentPage}) => {


    const next = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }

    const prev = () => {
        if(currentPage !== 1) setCurrentPage( currentPage - 1 )
    }

    const setPagination = (page) => {
        if(currentPage !== page) setCurrentPage(page)
    }

    const generatePageNumbers = () => {
        const maxPagesToShow = 5; 

        // Calcula los números de página para mostrar
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;

        // Asegúrate de que no se muestren números de página negativos o superiores a nPages
        if (endPage > nPages) {
            endPage = nPages;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        const pageNumbers = [];

        // Agrega el número de página 1 y puntos suspensivos si no es la primera página
        if (startPage > 1) {
            pageNumbers.push(
                <a key={1} onClick={() => setPagination(1)}>1</a>
            );
            if (startPage > 2) {
                pageNumbers.push(<strong key="start">...</strong>);
            }
        }

        // Agrega los números de página en el rango
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <a key={i} onClick={() => setPagination(i)}>{i}</a>
            );
        }

        // Agrega puntos suspensivos y el número de página final si no es la última página
        if (endPage < nPages) {
            if (endPage < nPages - 1) {
                pageNumbers.push(<strong key="end">...</strong>);
            }
            pageNumbers.push(
                <a key={nPages} onClick={() => setPagination(nPages)}>{nPages}</a>
            );
        }

        return pageNumbers;
    }

    return (
        <>

            <div className={styles.div}>
                <div className={styles.h3}>
                    <span onClick={prev}>Prev</span>
                </div>
                <div className={styles.pagination}>
                    <span className={styles.currentPage}><strong>Página actual: {currentPage}</strong></span>
                    <span>{generatePageNumbers()}</span>
                </div>
                <div className={styles.h3}>
                    <span onClick={next}>Next</span>
                </div>
            </div>
        </>
    );
};

export default Pagination;