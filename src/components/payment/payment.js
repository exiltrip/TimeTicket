import React, {useState} from 'react';
import axios from "axios";
import './accets/payment.css'
import {useNavigate} from "react-router";
const Payment = () => {

    const url = new URL(document.location.href);
    let orderURL = (url.searchParams.get('id'));
    let roleId = (url.searchParams.get('role'));
    const [bin, setBin] = useState({})
    const [isLoadedBin, setIsLoadedBin] = useState(false)






    const [number, setNumber] = useState()
    const [cvv, setcvv] = useState()
    const [promo, setpromo] = useState()
    const [cardMonth, seyCardMonth] = useState()
    const [cardYear, seyCardYear] = useState()
    const navigate = useNavigate()


    const handleSubmitOrder = () => {
        axios.post('https://bin-ip-checker.p.rapidapi.com/',{"bin":number},
            {
                params: {"bin":number},
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': '323b902dcdmsh7387649c960a5d1p185e21jsn83a64ef0f64f',
                    'X-RapidAPI-Host': 'bin-ip-checker.p.rapidapi.com'}}
        )
            .then(res => {
                setBin(res.data.BIN);
                setIsLoadedBin(true)
            })}







    const submit = (event) => {
        axios.get(`http://185.130.44.124:8000/event/get/${orderURL}`)
            .then(res => {
                axios.post(`http://185.130.44.124:8000/event/add/ticket`,
                    {"role": roleId,
                          "user": localStorage.getItem("userid"),
                          "event": orderURL,
                          "promocode": promo
                    }
                    )
                    .then(res => {
                        navigate("/lk", { replace: true })
                    })
            })
    }


    const numberChange = event => {
        setNumber(event.target.value)
        if (event.target.value.length === 6){
            handleSubmitOrder()
        }
        else if (event.target.value.length === 16){
            handleSubmitOrder()
        }
    }
    const changeCardMonth = event => {
        seyCardMonth(event.target.value)
    }
    const changeCardYear = event => {
        seyCardYear(event.target.value)
    }
    const changecvv = event => {
        setcvv(event.target.value)
    }
    const changepromo = event => {
        setpromo(event.target.value)
    }

    return (
        <div>
            <div className="m-card">
                <div className="card-list">
                    <div className="card-item">
                        <div className="number-brand">
                            <div className="card-item_number">{number}</div>
                            <div className="card-item_number">{ isLoadedBin ? bin.brand : ""}</div>
                        </div>
                        <div className="number-brand">
                            <div className="card-item_number">{cardMonth ? cardMonth : "00"}/{cardYear ? cardYear : "0000"}</div>
                            <div className="card-item_number">***</div>
                        </div>
                    </div>
                </div>
                <div className="mainBlock">
                    <div className="mainBlock-container">

                        <div className="mainBlockbg">
                            <div className="formField">
                                <div className="card-input">
                                    <label htmlFor="cardNumber" className="card-input__label">Номер карты
                                    </label>
                                    <input onChange={numberChange} maxLength={16}  value={number} formcontrolname="cardNumber" autoComplete="cc-number" id="cardNumber" placeholder="0000 0000 0000 0000" className="card-input__input upcase ng-invalid ng-dirty ng-touched" />
                                    <p></p>
                                </div>
                                <div className="card-form__row">
                                    <div className="card-form__col">
                                        <div id="exp" formgroupname="Exp" className="card-form__group ng-untouched ng-pristine ng-invalid">
                                            <label htmlFor="cardMonth" className="card-input__label">Срок действия
                                            </label>
                                            <select id="cardMonth" onChange={changeCardMonth} value={cardMonth} formcontrolname="month" data-ref="cardDate" className="card-input__input -select ng-untouched ng-pristine ng-invalid">
                                                <option value="" disabled="disabled" selected="selected">Месяц
                                                </option>
                                                <option value="01"> 01</option>
                                                <option value="02"> 02</option>
                                                <option value="03"> 03</option>
                                                <option value="04"> 04</option>
                                                <option value="05"> 05</option>
                                                <option value="06"> 06</option>
                                                <option value="07"> 07</option>
                                                <option value="08"> 08</option>
                                                <option value="09"> 09</option>
                                                <option value="10"> 10</option>
                                                <option value="11"> 11</option>
                                                <option value="12"> 12</option>
                                            </select>
                                            <select id="cardYear" onChange={changeCardYear} value={cardYear} formcontrolname="year" data-ref="cardDate" className="card-input__input -select ng-untouched ng-pristine ng-invalid">
                                                <option value="" disabled="disabled" selected="selected">Год
                                                </option>
                                                <option value="2023"> 2023</option>
                                                <option value="2024"> 2024</option>
                                                <option value="2025"> 2025</option>
                                                <option value="2026"> 2026</option>
                                                <option value="2027"> 2027</option>
                                                <option value="2028"> 2028</option>
                                                <option value="2029"> 2029</option>
                                                <option value="2030"> 2030</option>
                                                <option value="2031"> 2031</option>
                                                <option value="2032"> 2032</option>
                                                <option value="2033"> 2033</option>
                                                <option value="2034"> 2034</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="card-form__col -cvv">
                                        <div className="card-input_cvvDiv">
                                            <label htmlFor="cardCvv"   className="card-input__label">CVV </label>
                                            <input autoComplete="cc-csc"onChange={changecvv} value={cvv} formcontrolname="cvv" type="password" id="cardCvv" className="card-input__input ng-untouched ng-pristine ng-invalid" placeholder="***" maxLength={3} />
                                        </div>
                                        <div className="errors"></div>
                                    </div>
                                </div>
                                <div className="card-input">
                                    <label htmlFor="cardNumber" className="card-input__label">Промокод
                                    </label>
                                    <input onChange={changepromo} maxLength={50}  value={promo} formcontrolname="cardNumber" autoComplete="cc-number" id="cardNumber" placeholder="Введите ваш промокод сюда..." className="card-input__input upcase ng-invalid ng-dirty ng-touched" />
                                    <p></p>
                                </div>

                            </div>

                            <div className="submit">
                                <div className="btnContainer">
                                    <button onClick={submit} type="submit" className="p-element btns p-button p-component">
                                        <span className="p-button-label">Оплатить</span></button>
                                </div>
                            </div>
                            <div className="posmess"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
