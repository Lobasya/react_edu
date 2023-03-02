import React, { useEffect, useState } from "react";
import './style.css';
import FilmCard from "../../components/FilmCard";
import api from '../../services/api';

const List = ({list, handleShowInfo}) => {

    if(!list.length) {
        return <h1>No items</h1>
    }

    return list.map(item => <FilmCard data={item} handleShowInfo={() => handleShowInfo(item)}/>)
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
    const [list, setList] = useState([]);
    const [viewType, setViewType] = useState({
        type: 'list', /// info or list
        data: null,
    })
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.getFilms().then(films => setList(films)).finally(() => setIsLoading(false));
    }, []);

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

    if(isLoading) return <h1>Loading...</h1>

    return (
        <div className="container">
            {
                viewType.type === 'list' ? 
                <List list={list} handleShowInfo={handleShowInfo}/> : 
                <Details data={viewType.data} handleBack={handleBack}/>
            }
        </div>
    )
}

export default Films;