import React, { useEffect, useState, useContext } from "react";
import './style.css';
import FilmCard from "../../components/FilmCard";
import { Context } from '../../App';




const List = ({handleShowInfo}) => {
    const { state, dispatch } = useContext(Context);

    const handleDeleteFilm = (id) => dispatch({type: 'FILMS/DELETE_BY_ID', payload: id})

    if(!state.films.length) {
        return <h1>No items</h1>
    }

    return (
        <div className="list_container">
            {state.films.map(item => <FilmCard handleDeleteFilm={handleDeleteFilm} data={item} handleShowInfo={() => handleShowInfo(item)}/>)}
        </div>
    )
}

const Details = ({data, handleBack}) => {
    return (
        <div className="details">
            <button onClick={handleBack}>{"< Back to films"}</button>
            <div>
                <img src={`https://starwars-visualguide.com/assets/img/films/${data.episodeId}.jpg`} alt="" />
            </div>
            <h1>Name: {data.name}</h1>
            <p>Director: {data.director}</p>
            <p>Opening crawl: {data.openingCrawl}</p>
        </div>
    )
}

const Films = () => {
    const { state } = useContext(Context);
    const [viewType, setViewType] = useState({
        type: 'list', /// info or list
        data: null,
    })


    const handleShowInfo = (data) => {
        setViewType({
            type: 'info',
            data,
        })
    }

    const handleBack = () => {
        setViewType({
            type: 'list',
            data: null,
        })
    }

    if(state.isLoading) return <h1>Loading...</h1>

    return (
        <div className="container">
            {
                viewType.type === 'list' ? 
                <List handleShowInfo={handleShowInfo}/> : 
                <Details data={viewType.data} handleBack={handleBack}/>
            }
        </div>
    )
}

export default Films;