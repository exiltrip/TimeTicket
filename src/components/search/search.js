import React, {useEffect, useState} from 'react';
import axios from "axios";
import './search.sass'
import {NavLink} from "react-router-dom";

const Search = () => {

    const url = new URL(document.location.href);
    const urlID = (url.searchParams.get('id'));
    const [eventData, setEventData] = useState([])


    const getData = () => {
        axios.get(`http://185.130.44.124:8000/event/list?search=${urlID}`)
            .then(res => {
                setEventData(res.data.results)
                console.log(res.data.results)
            })
    }
    useEffect(() => {
        getData()
    }, [])


    return (

        <main className="sch-main">
            <h2 className="sch-title">Вот что мы нашли:</h2>
        <div className="sch-list">
            {eventData.map(data =>
                <NavLink className="sch-item" to={`/event?id=${data.id}`}>
                    <span className="sch-text sch-fst">{data.name}</span>
                    <span className="sch-text">{data.group}</span>
                    <span className="sch-text">{data.date_of_the_event}</span>
                </NavLink>)}

        </div>


        </main>
    );
};

export default Search;
