import { GET_ALL_DRIVERS, GET_BY_NAME, GET_BY_DETAIL, RESET_DETAIL, GET_ALL_TEAMS, CREATE_NEW_DRIVER, ORDER_BY_BIRTHDATE_ASC, ORDER_BY_BIRTHDATE_DESC, FILTER_BY_ORIGIN, FILTER_BY_TEAM, ORDER_BY_NAME } 
from "./action-types";

const initialState = {
    allDriver: [],
    drivers: [],
    allTeams: [],
    driverDetail: {}
}


const reducer = (state = initialState, {type, payload}) =>{
    let aux = []

    switch(type){
        case GET_ALL_DRIVERS:
            return {
                ...state,
                allDriver: payload,
                drivers: payload
            }
        case GET_ALL_TEAMS:
            return {
                ...state,
                allTeams: payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                drivers: payload
            }
        case ORDER_BY_NAME:
        const sortOrder = payload === "a-z" ? 1 : -1
        const ordered = [...state.drivers].sort(
            (a,b) => a.name.localeCompare(b.name) * sortOrder
        )
        return {
            ...state,
            drivers: ordered
        }
        case ORDER_BY_BIRTHDATE_ASC:
        const driversAsc = [...state.drivers].sort((a, b)=>{
            return new Date(a.birthdate) - new Date(b.birthdate)
        })
        return {
            ...state,
            drivers: driversAsc
        }
        case ORDER_BY_BIRTHDATE_DESC:
            const driversDesc = [...state.drivers].sort((a, b)=>{
                return new Date(b.birthdate) - new Date(a.birthdate)
            })
            return {
                ...state,
                drivers: driversDesc
            }
        case GET_BY_DETAIL:
            return {
                ...state,
                driverDetail: payload
            }
        case RESET_DETAIL:
            return {
                ...state,
                driverDetail: {}
            }
        case CREATE_NEW_DRIVER:
            return{...state}

        case FILTER_BY_TEAM:{
            let driversWithTeams = payload === 'all' ? state.allDriver : state.allDriver?.filter((driver) =>{
                if(!driver.team) return undefined
                else return driver.team.split(',').includes(payload)
            })
            return{
                ...state,
                drivers: driversWithTeams
            }
        }
        case FILTER_BY_ORIGIN:
            const filteredOrigin = payload === 'from_DB' ? state.allDriver.filter(driver => driver.from_DB) : state.allDriver.filter(driver => !driver.from_DB)
            return {
                ...state,
                drivers: payload === 'all' ? state.allDriver : filteredOrigin
            }
            default:
                return {...state}
}}

export default reducer