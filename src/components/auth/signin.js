import React, {useEffect, useState} from 'react';
import './auth.sass'
import {useNavigate} from "react-router";
import axios from "axios";
const Signin = (props) => {


    localStorage.clear();

    const [password, setPassword] = useState();
    const [username, setLogin] = useState();
    const [telephone, setTelephone] = useState();
    const [email, setEmail] = useState();

    const [passwordError, setPasswordError] = useState('пароль не может быть пустым!');
    const [loginError, setLoginError] = useState('логин не может быть пустым!');
    const [telephoneError, setTelephoneError] = useState('логин не может быть пустым!');
    const [emailError, setEmailError] = useState('логин не может быть пустым!');

    const [passwordDirty, setPasswordDirty] = useState(false);
    const [loginDirty, setLoginDirty] = useState(false);
    const [telephoneDirty, setTelephoneDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);

    const [formValid, setFormValid] = useState(false);




    useEffect(() => {
        if (passwordError || loginError || emailError || telephoneError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    },[ passwordError, loginError, emailError, telephoneError])

    const blurHandler = (e) =>  {
        switch (e.target.name){
            case 'email':
                setEmailDirty(true)
                break
            case 'telephone':
                setTelephoneDirty(true)
                break
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
    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('incorrect e-mail')
            if(!e.target.value){
                setEmailError('e-mail cannot be empty')
            }
        }
        else{
            setEmailError("")
        }
    }

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    };

    const telephoneHandler = (e) => {
        setTelephone(e.target.value)
        if (e.target.value.length < 12) {
            setTelephoneError('incorrect value')
            if(!e.target.value){
                setTelephoneError('cannot be empty!')
            }
        }else{
            setTelephoneError("")
        }
    };
    const handleChangeLogin = event => {
        setLogin(event.target.value);
    };
    const handleChangeTelephone = event => {
        setTelephone(event.target.value);
    };

    const handleChangePassword = event => {
        setPassword(event.target.value);
    };

    let navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://185.130.44.124:8000/user/register/`, {password, username, email, telephone})
            .then(res => {
                console.log(res);
                console.log(res.data);
                setPassword('');
                setLogin('');
                setTelephone('');
                setEmail('');


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
                {(loginDirty && loginError) && <div className="error" style={{color: "red"}}>{loginError}</div>}
                <input type="text" placeholder="login"  onChange={e => loginHandler(e) && handleChangeLogin} value={username} onBlur={e => blurHandler(e)} name="login" className="login-form-input"/>
                <span className="login-form-title">Пароль</span>
                {(passwordDirty && passwordError) && <div className="error" style={{color: "red"}}>{passwordError}</div>}
                <input type="password" placeholder="password" onChange={e => passwordHandler(e) && handleChangePassword} value={password} onBlur={e => blurHandler(e)} type="password" name="password" className="login-form-input"/>

                <span className="login-form-title">Мыло</span>
                {(emailDirty && emailError) && <div className="error" style={{color: "red"}}>{emailError}</div>}
                <input type="text" placeholder="email"  onChange={e => emailHandler(e) && handleChangeEmail()} value={email} onBlur={e => blurHandler(e)} name="email" className="login-form-input"/>
                <span className="login-form-title">Телефон</span>
                {(telephoneDirty && telephoneError) && <div className="error" style={{color: "red"}}>{telephoneError}</div>}
                <input type="text" placeholder="7(000)000-00-00" onChange={e => telephoneHandler(e) && handleChangeTelephone()} value={telephone} onBlur={e => blurHandler(e)} type="text" name="telephone" className="login-form-input"/>
                <button className="login-form-submit" onClick={handleSubmit}>Submit</button>
            </div>
        </main>
    );
};

export default Signin;
