import React from "react";

const Modal = ({ handleCloseModal, user }) => {
    return (
        <div className="modal" onClick={handleCloseModal}>
            <div className="modal_container">
                <p>Name: {user.name}</p>
                <p>Gender: {user.gender}</p>
            </div>
        </div>
    )
}

export default Modal;