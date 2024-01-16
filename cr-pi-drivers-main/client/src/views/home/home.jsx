import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllDrivers, getByName } from "../../redux/actions";
import NavBar from "../../components/navBar/NavBar";
import styles from './home.module.css'
import CardList from "../../components/CardList/CardlList";
import Pagination from './Pagination/pagination';

const Home = () => {

    const dispatch = useDispatch();
    const allDrivers = useSelector((state)=> state.drivers);
    const [drivers, setDrivers] = useState(9)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchString, setSearchString] = useState("");

    const handleChange = (e) => {
        e.preventDefault()
        setSearchString(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(getByName(searchString))
    }



    //Pagination
    const indexFin = currentPage * drivers;
    const indexIni = indexFin - drivers;

    const nDrivers = allDrivers.slice(indexIni, indexFin)

    const nPages = Math.ceil(allDrivers.length / drivers);



    useEffect(() => {
        dispatch(getAllDrivers())
    }, [dispatch])

    

    return (
        <div className={styles.home}>
            <NavBar handleChange={handleChange} handleSubmit={handleSubmit}/>
            <CardList nDrivers={nDrivers}/>
            <Pagination 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            nPages={nPages}
            />
        </div>
    );
};

export default Home;