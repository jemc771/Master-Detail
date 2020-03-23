import { GET_HEROES } from '../actions/app';

export const getHeroes = (state,action) => { 
    switch(action.type){
        case GET_HEROES:
            return {...state, heroes: action.payload};
        default: 
            return state;
    }
    //return state;
}