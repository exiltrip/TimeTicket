import React, {useEffect, useState} from 'react';
import './main.sass'
import {NavLink} from "react-router-dom";
import axios from "axios";
import EventsLoader from "../loaders/eventsLoader/eventsLoader";
const Main = () => {
    const [events, setEvents] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const getComingEvents = () => {
        axios.get(`http://185.130.44.124:8000/event/list?ordering=-date_of_the_event` )
            .then(res => {
                setEvents(res.data.results)
                setIsLoaded(true)
                console.log(events)
            })
    }
    useEffect(() => {
        getComingEvents()
    }, [])
    return (
        <main className='main'>
            <h2 className="main-title">События в ближайшие дни </h2>
            <div className="main-card-container">
                { isLoaded
                    ? events.map(events =>
                    <NavLink className="main-card-item" to={`/event?id=${events.id}`}><div id={events.id}>{events.name}</div></NavLink>
                    )
                    : <>
                        <EventsLoader/>
                        <EventsLoader/>
                        <EventsLoader/>
                    </>
                }
            </div>
            <h2 className="main-title-second">Подборки мероприятий </h2>
            <div className="main-card-container-groups">
                <NavLink className="tdn" to="/search?id=lection"><div className="main-card-item-groups lection">Лекции</div></NavLink>
                <NavLink className="tdn" to="/search?id=meetup"><div className="main-card-item-groups meetup">Митапы</div></NavLink>
                <NavLink className="tdn" to="/search?id=teambuilding"><div className="main-card-item-groups teambuild">Тимбилдинг</div></NavLink>
                <NavLink className="tdn" to="/search?id=conference"><div className="main-card-item-groups conf">Конференции</div></NavLink>
            </div>
        </main>
    );
};

export default Main;
