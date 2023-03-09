import './App.css';
import React, { useState, useEffect, useReducer } from 'react';
import Wrapper from './components/Wrapper';
import NavBar from './components/NavBar';
import Films from './containers/Films';
import People from './containers/People';
import api from './services/api';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  console.log(category)

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

  return (
      <Wrapper>
        <NavBar/>
        {category === 'films' && <Films/>}
        {category === 'people' && <People/>}
      </Wrapper>
  )
}

export default App;

