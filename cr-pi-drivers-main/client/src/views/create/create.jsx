import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeams, createNewDriver } from '../../redux/actions';
import { Link } from 'react-router-dom';
import styles from './create.module.css'
import validate from './validate';
const Create = () => {


    const dispatch = useDispatch();
    const teams = useSelector((state)=>state.allTeams)

    const [input,setInput] = useState({
        name: '',
        lastname: '',
        nationality: '',
        image: '',
        birthdate: '',
        description: '',
        team: []
    })


    const [error,setError] = useState({})

  


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        
    }


    const handleTeamChoices = (e) => {
        let { value } = e.target;
        if(input.team.includes(value)){
            return alert('Los equipos no pueden repetirse')
        }
        setInput({
            ...input,
            team:[...input.team, value]
        })
    }


    const handleDelete = (team) => {
        setInput({
            ...input,
            team: input.team.filter(el => el !== team)
        })
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createNewDriver(input))
        console.log(input);
        alert('El piloto ha sido creado correctamente')
        setInput({
            name: '',
            lastname: '',
            nationality: '',
            image: '',
            birthdate: '',
            description: '',
            team: []
        })
    }




    useEffect(()=>{
        dispatch(getAllTeams())
    }, []);




    return (
        <div className={styles.background}>
                <div>
                    <Link to='/home'>
                        <button className={styles.button}>Home</button>
                    </Link>
                </div>
                <div className={styles.title}>
                    <h1>Create a new driver</h1>
                </div>
            <div className={styles.containerForm}>
                <form className={styles.form}>
                    <div className={styles.everyInput}>
                        <label className={styles.label}>Name</label>
                            <input className={styles.box} type='text' name='name' value={input.name} onChange={handleChange}/>
                            {error.name && <span className={styles.error}>{error.name}</span>}
                        
                    </div>
                    <div className={styles.everyInput}>
                        <label className={styles.label}>Lastname</label>
                            <input className={styles.box} name='lastname' value={input.lastname} onChange={handleChange}/>
                        
                        {error.lastname && <span className={styles.error}>{error.lastname}</span>}
                    </div>
                    <div className={styles.everyInput}>
                        <label className={styles.label}>Nationality</label>
                            <input className={styles.box} name='nationality' value={input.nationality} onChange={handleChange}/>
                        
                        {error.nationality && <span className={styles.error}>{error.nationality}</span>}
                    </div>
                    <div className={styles.everyInput}>
                        <label className={styles.label}>Image</label>
                            <input className={styles.box} name='image' value={input.image} onChange={handleChange} placeholder='Agrega una url'/>
                        
                        {error.image && <span className={styles.error}>{error.image}</span>}
                    </div>
                    <div className={styles.everyInput}>
                        <label className={styles.label}>Birthdate</label>
                            <input className={styles.box} type='date' name='birthdate' value={input.birthdate} onChange={handleChange}/>
                        
                        {error.birthdate && <span className={styles.error}>{error.birthdate}</span>}
                    </div>
                    <div className={styles.everyInput}>
                        <label className={styles.label}>Description</label>
                            <input className={styles.box} name='description' value={input.description} onChange={handleChange}/>
                        
                        {error.description && <span className={styles.error}>{error.description}</span>}
                    </div>
                    <div className={styles.everyInput}>
                        <label className={styles.label}>Teams</label>
                            <select className={styles.box} onChange={(e) =>handleTeamChoices(e)}>
                                <option value="all"></option>
                                {teams.map((team, index)=>{
                                    return(
                                        <option key={index} value={team} >
                                            {team}
                                        </option>
                                    )
                                })}
                            </select>
                        
                            {error.team && <span className={styles.error}>{error.team}</span>}
                    </div>

                    <div className={styles.teamSelected}>
                        <p className={styles.label}>Team/s of the new driver</p>

                    

                    <div className={styles.selected}>
                        {input.team.map((team, index) => 
                            <div key={index} className={styles.teamSelected}>
                                <span className={styles.p}  onClick={()=>handleDelete(team)}>{team}</span>
                            </div>
                        )}
                    </div>


                        <button className={styles.createButton} type='submit' onClick={handleSubmit} disabled={
                        error.name || error.lastname || error.nationality || error.image || error.birthdate || error.description || error.team || !input.name
                        }>Crear piloto</button>
                    </div>

                </form>
            </div>
        </div>
                    
    );
};

export default Create;