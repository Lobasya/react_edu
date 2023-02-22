import React from "react";

const User = ({ user, handleShowModal }) => {
    return (
        <div className="user" onClick={handleShowModal}>
            <img src="" alt="" />
            <p>Name: {user.name}</p>
            <p>Gender: {user.gender}</p>
        </div>
    )
}

export default User;