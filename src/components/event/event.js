import React, {useEffect, useState} from 'react';
import './event.sass'
import axios from "axios";
const Event = () => {

    const url = new URL(document.location.href);
    const urlID = (url.searchParams.get('id'));
    const [eventData, setEventData] = useState([])
    const [eventDate, setEventDate] = useState()
    const getData = () => {
        axios.get(`http://185.130.44.124:8000/event/list?search=${urlID}`)
            .then(res => {
                setEventData(res.data.results)
                let date = new Date(res.data.results.date_of_the_event)
                setEventDate(date)
                console.log(res.data.results)

            })
    }
    useEffect(() => {
        getData()
    }, [])


    return (
        <main className="ev-main">
            <div className="ev-desc-container">
            {eventData.map(data => <h2 className="ev-title">Событие: {data.name}</h2>)}
            {eventData.map(data => <h2 className="ev-title">Дата: {data.date_of_the_event}</h2>)}
            </div>
            <h2 className="ev-title">Билеты</h2>
            <div className="ev-ticket-container">
                {eventData.map(data => <div className="ev-title-ticket-desc">Standart | {data.base_count - data.count_buy_base_ticket - data.count_pyment_base_ticket} осталось</div>)}
                {eventData.map(data => <div className="ev-title-ticket">{data.base_price}р</div>)}
                {eventData.map(data => {
                    if (data.base_count - data.count_buy_base_ticket - data.count_pyment_base_ticket < 1){
                        return(<button className="ev-ticket-button" disabled>Купить</button>)
                    }
                    else{
                        return(<button className="ev-ticket-button">Купить</button>)
                    }

                }

                )}

            </div>
            <div className="ev-ticket-container">
                {eventData.map(data => <div className="ev-title-ticket-desc">VIP | {data.vip_count} осталось</div>)}
                {eventData.map(data => <div className="ev-title-ticket">{data.vip_price}р</div>)}
                {eventData.map(data => {
                        if (data.vip_count - data.count_buy_vip_ticket - data.count_pyment_vip_ticket < 1){
                            return(<button className="ev-ticket-button" disabled>Купить</button>)
                        }
                        else{
                            return(<button className="ev-ticket-button">Купить</button>)
                        }

                    }

                )}
            </div>
            <div className="ev-ticket-container">
                {eventData.map(data => <div className="ev-title-ticket-desc">Luxury | {data.luxury_price} осталось</div>)}
                {eventData.map(data => <div className="ev-title-ticket">{data.luxury_price}р</div>)}
                {eventData.map(data => {
                        if (data.luxury_count - data.count_buy_luxury_ticket - data.count_pyment_luxury_ticket < 1){
                            return(<button className="ev-ticket-button" disabled>Купить</button>)
                        }
                        else{
                            return(<button className="ev-ticket-button">Купить</button>)
                        }

                    }

                )}
            </div>
            <div className="ev-title">О меропириятии</div>

            {eventData.map(data => <h2 className="ev-text">{data.description}</h2>)}
        </main>
    );
};

export default Event;