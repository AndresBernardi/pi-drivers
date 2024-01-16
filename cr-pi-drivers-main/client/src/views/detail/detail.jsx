import { getByDetail, resetDetail } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './detail.module.css'



const Detail = () => {

    let dispatch = useDispatch();
    let { id } = useParams();
    const driverDetail = useSelector((state)=> state.driverDetail)


    useEffect(()=>{
        dispatch(getByDetail(id))
        return () =>{
            dispatch(resetDetail())
        }
    },[])





    return (
        <div className={styles.container}>
            <Link to='/home'>
                <button className={styles.button}>↩</button>
            </Link>
            <div className={styles.containerDetail}>
                <h3>ID: {driverDetail?.id}</h3>
                <div className={styles.mainBox}>
                    <h1>{driverDetail?.name} {driverDetail?.lastname}</h1>
                    <h3>{driverDetail?.nationality}</h3>
                    <img className={styles.img} src={driverDetail?.image ? driverDetail.image : 'img'} alt="img" />
                </div>
                <div className={styles.infoDiv}>
                    <p><strong>Description: </strong>{driverDetail?.description? driverDetail.description : 'Formula 1 driver'}</p>
                    <span><strong>Birthdate:</strong> {driverDetail?.birthdate}</span>
                    <p><strong>Teams:</strong> {driverDetail?.team}</p>
                </div>
            </div>

        </div>
    );
};

export default Detail;