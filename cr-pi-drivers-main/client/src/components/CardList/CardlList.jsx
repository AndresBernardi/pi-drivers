import Card from '../Card/Cards'
import style from './cardList.module.css'

const CardList = ({nDrivers}) => {

    const driversList = nDrivers;

    return (
        <div className={style.cardList}>
            {driversList?.map(driver => (
                <Card key={driver.id} driver={driver}/>
            ))}
        </div>
        
    );
};

export default CardList;