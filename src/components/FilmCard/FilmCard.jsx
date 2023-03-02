import React from "react";
import './style.css';

const FilmCard = ({data, handleShowInfo}) => {
    return <div className="filmcard" onClick={handleShowInfo}>{data.name}</div>
}

export default FilmCard;