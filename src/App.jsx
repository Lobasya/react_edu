import './App.css';
import React, { useState, useEffect } from 'react';
import Wrapper from './components/Wrapper';
import NavBar from './components/NavBar';
import Films from './containers/Films';
import People from './containers/People';

const App = () => {
  const [category, setCategory] = useState('films');

  const handleChangeCategory = (category) => setCategory(category);

  return (
    <Wrapper>
      <NavBar handleChangeCategory={handleChangeCategory}/>
      {category === 'films' && <Films/>}
      {category === 'people' && <People/>}
    </Wrapper>
  )
}

export default App;

