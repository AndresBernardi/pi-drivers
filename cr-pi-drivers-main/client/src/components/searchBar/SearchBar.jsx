import styles from './searchBar.module.css'

const SearchBar = ({handleChange, handleSubmit}) => {
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} >
                <input className={styles.input} type="search" onChange={ handleChange } placeholder="Ingresa un nombre..." />
                <button className={styles.button} type='submit' >Buscar</button>
            </form>
        </div>
    );
};

export default SearchBar;