import { createStore, combineReducers } from 'redux';

const createCustomStore = (reducer) => {
    let state = reducer(undefined, { type: '@@reduxINIT' });

    const store = {}

    const callbacks = [];

    store.dispatch = (action) => {
        state = reducer(state, action);
        callbacks.forEach(callback => callback());
    }

    store.subscribe = (callback) => callbacks.push(callback);

    store.getState = () => state;

    return store;
}

const combineCustomReducers = (reducersMap) => {
    const reducer = (state = {}, action) => {
        const newState = {};
        for(let key in reducersMap) {
            newState[key] = reducersMap[key](state[key], action);
        }
        return newState;
    }
    return reducer;
}
  
const filmReducer = (state = [], action) => {
    switch (action.type) {
        case 'FILMS/SET':
            return action.payload;
        case 'FILMS/DELETE_BY_ID':
            return state.filter(film => film.id !== action.payload);
        default: 
            return state;
    }
}

const categoryReducer = (state = 'films', action) => {
    switch (action.type) {
        case 'CATEGORY/SET':
            return action.payload;
        default: 
            return state;
    }
}

const uiReducer = (state = { isLoading: true, theme: 'light' }, action) => {
    switch (action.type) {
        case 'LOADING/SET':
            return {
                ...state,
                isLoading: action.payload
            } 
        case 'THEME/TOGGLE':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light',
            }       
        default: 
            return state;
    }
}

const rootReducer = combineReducers({
    films: filmReducer,
    category: categoryReducer,
    ui: uiReducer,
})

const store = createStore(rootReducer);

export default store;