import React, {useEffect, useState} from 'react';
import './lk-main.sass'
import axios from "axios";
import {NavLink} from "react-router-dom";
const LkMain = (props) => {



    const [tickets, setTickets] = useState([])
const refresh = localStorage.getItem('refresh')
const isAdmin = localStorage.getItem("isAdmin")
const getTickets = () => {
    axios.post(`http://185.130.44.124:8000/user/jwttoken/refresh/`,
        {
            refresh:`${refresh}`
        })
        .then(resData => {
            localStorage.setItem("access", resData.data.access)
            localStorage.setItem("refresh", resData.data.refresh)
            axios.get('http://185.130.44.124:8000/event/get/user/tickets',
                {
                    headers: {
                        Authorization:`Bearer ${resData.data.access}`
                    }
                }
            )
                .then( res => {
                        if (res.data.data === null){
                            setTickets([])
                        }
                        else{
                            setTickets(res.data.data)
                        }
                    }
                )
        })
}
useEffect(() => {
    getTickets()
}, [])
    return (
        <main className="lk-main">
            <div className="lk-container">
                <h2 className="lk-title">Билеты</h2>
                <div className="lk-item">
                <table className="lk-table">
                    <thead className="lk-table-header">
                    <tr>
                        <th className="lk-table-title">Event</th>
                        <th className="lk-table-title">time</th>
                        <th className="lk-table-title ">role</th>
                        <th className="lk-table-title lk-table-end">action</th>
                    </tr>

                    </thead>
                    <tbody>
                    {tickets.map(data =>
                        <tr className="lk-table-container">
                            <td className="lk-table-item">{data.event.name}</td>
                            <td className="lk-table-item">{data.event.date_of_the_event}</td>
                            <td className="lk-table-item">{data.role}</td>
                            <td className="lk-table-item lk-table-end">{ data.role === "luxury"
                                ? <NavLink to={`/video?path=${data.event.id}.mp4`}>Видео</NavLink>
                                : ""
                            }</td>
                        </tr>
                    )}
                </tbody>
                </table>


                </div>
                {isAdmin
                ? <a href="http://185.130.44.124:8000/admin/" className="lk-admin">админ панель</a>
                : ""
                }
            </div>
        </main>
    );
};

export default LkMain;
