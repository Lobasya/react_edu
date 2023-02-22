import './App.css';
import React, { useState } from 'react';
import User from './User';
import Modal from './Modal';

const usersData = [
  {
    id: 1,
    name: 'John',
    gender: 'male'
  },
  {
    id: 2,
    name: 'Mila',
    gender: 'female'
  },
  {
    id: 3,
    name: 'Huan',
    gender: 'male'
  },
  {
    id: 4,
    name: 'Jane',
    gender: 'female'
  },
  {
    id: 5,
    name: 'Tom',
    gender: 'male'
  },
];

const App = () => {
  const [users, setUsers] = useState(usersData);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalUser, setModalUser] = useState(null);

  const filterUsersByName = (name) => {
    const nameToLowerCase = name.toLowerCase();
    return usersData.filter(user => user.name.toLowerCase().includes(nameToLowerCase));
  }

  const handleInputChange = (event) => {
    const filtredUsers = filterUsersByName(event.target.value);
    setUsers(filtredUsers);
  }

  const handleShowModal = (user) => {
    setIsShowModal(true);
    setModalUser(user);
  }

  const handleCloseModal = () => {
    setIsShowModal(false);
    setModalUser(null);
  }

  return (
    <>
      {isShowModal ? <Modal handleCloseModal={handleCloseModal} user={modalUser}/> : null}
      <input type="text" placeholder='Enter name' onChange={handleInputChange}/>
      <div className='container'>
        {users.map(user => <User user={user} handleShowModal={() => handleShowModal(user)}/>)}
      </div>
    </>
  )
}

export default App;
