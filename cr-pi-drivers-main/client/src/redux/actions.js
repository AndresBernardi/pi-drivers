import axios from 'axios'
import {GET_ALL_DRIVERS, GET_ALL_TEAMS, GET_BY_NAME, ORDER_BY_NAME, ORDER_BY_BIRTHDATE_ASC, ORDER_BY_BIRTHDATE_DESC, FILTER_BY_ORIGIN, FILTER_BY_TEAM, GET_BY_DETAIL, RESET_DETAIL, CREATE_NEW_DRIVER}
from './action-types'


export const getAllDrivers = () => {
    return async function(dispatch){
        const response = await axios('http:localhost:3001/drivers')
        return dispatch({type: GET_ALL_DRIVERS, payload: response.data})
    }
}

export const getAllTeams = ()=>{
    return async function(dispatch){
        const response = await axios('http:localhost:3001/teams')
        let teamList = response.data.map((team=>team.name))
        return dispatch({type: GET_ALL_TEAMS, payload: teamList})
    }
}

export const orderByName = (payload)=>{
    console.log('Action: orderByName, payload:', payload)
    return {type: ORDER_BY_NAME, payload}
    
}

export const orderByBirthdateAsc = ()=>{
    return {type: ORDER_BY_BIRTHDATE_ASC}
}

export const orderByBirthdateDesc = ()=>{
    return {type: ORDER_BY_BIRTHDATE_DESC}
}

export const filterByOrigin = (payload)=>{
    return {type: FILTER_BY_ORIGIN, payload}
}

export const filterByTeam = (payload)=>{
    return {type: FILTER_BY_TEAM, payload}
}


export const getByName = (name)=>{
    return async function(dispatch){
        try {
            const response = await axios(`http://localhost:3001/drivers/?name=${name}`)
            return dispatch({type: GET_BY_NAME, payload: response.data})
        } catch (error) {
            console.log(error)
        }
    }
}

export const getByDetail = (id) =>{
    return async function(dispatch){
        let response = await axios(`http://localhost:3001/drivers/${id}`)
        return dispatch({type: GET_BY_DETAIL, payload: response.data})
    }
}

export const createNewDriver =(payload)=>{
    return async function(dispatch){
        const newDriver = await axios.post('http://localhost:3001/drivers', payload)
        return newDriver
    }
}

export const resetDetail = ()=>{
    return{
        type: RESET_DETAIL
    }
}