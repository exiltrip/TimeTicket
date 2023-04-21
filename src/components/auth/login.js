import React, {useEffect, useState} from 'react';
import './auth.sass'
import {useNavigate} from "react-router";
import axios from "axios";
const Login = (props) => {


    localStorage.clear();

    const [password, setPassword] = useState();
    const [username, setLogin] = useState();

    const [passwordError, setPasswordError] = useState('пароль не может быть пустым!');
    const [loginError, setLoginError] = useState('логин не может быть пустым!');

    const [passwordDirty, setPasswordDirty] = useState(false);
    const [loginDirty, setLoginDirty] = useState(false);

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (passwordError || loginError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    },[ passwordError, loginError])

    const blurHandler = (e) =>  {
        switch (e.target.name){
            case 'password':
                setPasswordDirty(true)
                break
            case 'login':
                setLoginDirty(true)
                break
        }

    };

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 4) {
            setPasswordError('слишком короткий пароль!')
            if(!e.target.value){
                setPasswordError('пароль не может быть пустым!')
            }
        }else{
            setPasswordError("")
        }
    };
    const loginHandler = (e) => {
        setLogin(e.target.value)
        if (e.target.value.length < 4) {
            setLoginError('слишком короткий логин!')
            if(!e.target.value){
                setLoginError('логин не может быть пустым!')
            }
        }else{
            setLoginError("")
        }
    };

    const handleChangeLogin = event => {
        setLogin(event.target.value);
    };
    const handleChangePassword = event => {
        setPassword(event.target.value);
    };

    let navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://185.130.44.124:8000/user/login/`, {password, username})
            .then(res => {
                console.log(res);
                console.log(res.data);
                setPassword('');
                setLogin('');


                navigate(`../lk`, { replace: true });

                localStorage.setItem('userLogin', username);
                localStorage.setItem('access', res.data.access);
                localStorage.setItem('refresh', res.data.refresh);
                localStorage.setItem('isAdmin', res.data.is_super_user);
                localStorage.setItem('userid', res.data.id);
                props.logIn()
            })
    };
    return (
        <main className="login-main">
            <div className="login-form">
                <span className="login-form-title">Логин</span>
                <input type="text" placeholder="login"  onChange={e => loginHandler(e) && handleChangeLogin} value={username} onBlur={e => blurHandler(e)} name="login" className="login-form-input"/>
                <span className="login-form-title">Пароль</span>
                <input type="password" placeholder="password" onChange={e => passwordHandler(e) && handleChangePassword} value={password} onBlur={e => blurHandler(e)} type="password" name="password" className="login-form-input"/>
                <button className="login-form-submit" onClick={handleSubmit}>Submit</button>
            </div>
        </main>
    );
};

export default Login;
