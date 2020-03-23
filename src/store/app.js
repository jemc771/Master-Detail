import { createStore } from 'redux';
import { getHeroes } from '../reducers/heroes';

const initialState = {
       heroes : []
    
};

export const store = createStore(getHeroes, initialState, 
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());