import './App.css';
import React, { useState, useEffect } from 'react';


const App1 = () => {
    const [counter, setCounter] = useState(0);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
      setInterval(() => {
        setCounter(prevState => prevState + 1)
      }, 1000)
      return () => {}
    }, [disable]);

    const handleClick = () => {
      setDisable(!disable);
    }

    return (
      <div>
        <h1>{counter}</h1>
        <button onClick={handleClick}>Clear</button>
      </div>
    )
}

const Mobile = () => {
  const [counter, setCounter] = useState(0);
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const id = setInterval(() => {
      console.log('Mobile')
      setCounter(prevState => prevState + 1)
    }, 1000)
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const callback = () => {
      setSize(window.innerWidth);
      console.log('Mobile resize');
    }
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [])

  return (
    <div>
      <h1>Mobile: {counter}</h1>
      <h1>Size: {size} px</h1>
    </div>
  )
}

const Desktop = () => {
  const [counter, setCounter] = useState(0);
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const id = setInterval(() => {
      console.log('Desk')
      setCounter(prevState => prevState + 1)
    }, 1000)
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const callback = () => {
      setSize(window.innerWidth);
      console.log('Desk resize');
    };
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  }, [])

  return (
    <div>
      <h1>Desktop: {counter}</h1>
      <h1>Size: {size} px</h1>
    </div>
  )
}

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 500))
  }, [])

  return (
    <div>
      {isMobile ? <Mobile/> : <Desktop/>}
    </div>
  )
}

export default App;
