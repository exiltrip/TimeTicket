import React, {useEffect, useState} from 'react';
import './lk-main.sass'
import axios from "axios";

const LkMain = (props) => {
const [tickets, setTickets] = useState([])
const access = localStorage.getItem('access')
const refresh = localStorage.getItem('refresh')
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
                        setTickets(res.data.data)
                    }
                )
        })
}
useEffect(() => {
    getTickets()
}, [])
 const ticketss = [
     {artist: "ТехноСтрелка", time:"18 апреля", desc:"международный фестиваль", zone:"VIP"},
     {artist: "ТехноСтрелка", time:"19 апреля", desc:"международный фестиваль", zone:"LUX"},
     {artist: "ТехноСтрелка", time:"20 апреля", desc:"международный фестиваль", zone:"DEFAULT"}
 ]
 const events = [
     {artist: "ТехноСтрелка", time:"18 апреля", desc:"международный фестиваль"}
 ]

    return (
        <main className="lk-main">
            <div className="lk-container">
                <h2 className="lk-title">Билеты</h2>
                <div className="lk-item">
                <table className="lk-table">
                    <thead className="lk-table-header">
                    <tr>
                        <th className="lk-table-title">artist</th>
                        <th className="lk-table-title">description</th>
                        <th className="lk-table-title">time</th>
                        <th className="lk-table-title lk-table-end">zone</th>
                    </tr>

                    </thead>
                    <tbody>
                    {tickets.map(data =>
                        <tr className="lk-table-container">
                            <td className="lk-table-item">{data.artist}</td>
                            <td className="lk-table-item">{data.desc}</td>
                            <td className="lk-table-item">{data.time}</td>
                            <td className="lk-table-item lk-table-end">{data.role}</td>
                        </tr>
                    )}
                </tbody>
                </table>
                </div>
                <h2 className="lk-title">Мероприятия</h2>
                <div className="lk-item">
                    <table className="lk-table">
                        <thead className="lk-table-header">
                        <tr>
                            <th className="lk-table-title">artist</th>
                            <th className="lk-table-title">description</th>
                            <th className="lk-table-title lk-table-end">time</th>
                        </tr>

                        </thead>
                        <tbody>
                        {events.map(data =>
                            <tr className="lk-table-container">
                                <td className="lk-table-item">{data.artist}</td>
                                <td className="lk-table-item">{data.desc}</td>
                                <td className="lk-table-item lk-table-end">{data.time}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                {props.isAdmin 
                ? <a href="admin/" className="lk-admin"></a>
                : ""
                }
            </div>
        </main>
    );
};

export default LkMain;