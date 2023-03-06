import './App.css';
import React, { useState, useEffect, useReducer } from 'react';
import Wrapper from './components/Wrapper';
import NavBar from './components/NavBar';
import Films from './containers/Films';
import People from './containers/People';
import api from './services/api';

export const Context = React.createContext(null);

const useCustomReducer = (reducer, initalState) => {
  const [state, setState] = useState(initalState);

  const dispatch = (action) => {
    setState(prevState => {
      const newState = reducer(prevState, action);
      return newState;
    });
  }

  return [state, dispatch]
}

const initalState = {
  counter: 1,
  films: [],
  category: 'films',
  isLoading: true,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FILMS/SET':
      return {
        ...state,
        films: action.payload,
      }
    case 'FILMS/DELETE_BY_ID':
      return {
        ...state,
        films: state.films.filter(film => film.id !== action.payload),
      }
    case 'LOADING/SET':
      return {
        ...state,
        isLoading: action.payload
      }  
    case 'CATEGORY/SET':
      return {
        ...state,
        category: action.payload,
      }    
    default: 
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useCustomReducer(reducer, initalState);

  useEffect(() => {
      api.getFilms()
          .then(films => dispatch({
            type: 'FILMS/SET',
            payload: films,
          }))
          .finally(() => dispatch({
            type: 'LOADING/SET',
            payload: false,
          }));
  }, []);

  const handleChangeCategory = (category) => 
    dispatch({type: 'CATEGORY/SET', payload: category});  

  return (
    <Context.Provider value={{state, dispatch}}>
      <Wrapper>
        <NavBar handleChangeCategory={handleChangeCategory}/>
        {state.category === 'films' && <Films/>}
        {state.category === 'people' && <People/>}
      </Wrapper>
    </Context.Provider>
  )
}

export default App;

