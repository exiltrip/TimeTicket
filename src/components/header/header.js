import React, {useState} from 'react';
import './header.sass'
import logo from '../../accets/lad-logo.png'
import userLogo from '../../accets/user-logo.svg'
import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router";
const Header = (props) => {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const handleChangeSearch = event => {
        setSearch(event.target.value);
    };
    const submitSearch = () =>{
        navigate(`../search?id=${search}`, { replace: true });
    }
    const showModal = () => {
        let modalWindow = document.getElementById("header-modal")
        if (modalWindow.classList.contains("lk-hidden") === true){
            modalWindow.classList.remove("lk-hidden")
        }
        else{
            modalWindow.classList.add("lk-hidden")
        }
    }

    return (
        <header>
            <NavLink className="header-logo" to="/"> <img className="header-logo" src={logo} alt=""/></NavLink>
            <div className="header-find-container">
            <input className="header-find" onChange={handleChangeSearch} value={search} placeholder="События и мероприятия"/>
            <button className="header-find-button" onClick={submitSearch}>Find</button>
            </div>
            {props.isLoggedIn

                ? <div className="lk-container-modals">
                    <div className="header-lk-container"  onClick={showModal}>
                <img src={userLogo} alt="" className="user-logo"/>
                <span className="user-name">{localStorage.getItem("userLogin")}</span>
                    </div>
                    <div className="header-modal-lk lk-hidden" id="header-modal">
                        <div className="lk-top-section" onClick={showModal}>
                        <NavLink to="/lk" className="lk-a">
                        Личный кабинет
                        </NavLink>
                        </div>
                        <div onClick={showModal} className="lk-bottom-section">

                            <NavLink onClick={props.logOut} to="/lk" className="a-nf lk-a">
                                выйти
                            </NavLink>
                        </div>
                    </div>
                </div>
                : <div><NavLink className="user-lk-link" to="signin">Sign in</NavLink> / <NavLink to="login" className="user-lk-link">Log in</NavLink></div>}

        </header>
    );
};

export default Header;