import './App.css';
import Header from "./components/header/header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from "react";
import Main from "./components/main/main";
import Login from "./components/auth/login";
import Signin from "./components/auth/signin";
import LkMain from "./components/lk/lk-main";
import Event from "./components/event/event";
import Search from "./components/search/search";
import Payment from "./components/payment/payment";
import Video from "./components/video/video";

function App() {

    let isLI = localStorage.getItem("isLoggedIn")
    const [isLoggedIn, setisLoggedIn] = useState(isLI);

    let isAdm = localStorage.getItem("isLoggedIn")
    const [isAdmin, setIsAdmin] = useState(isAdm);

    const logIn = () => {
        setisLoggedIn("true");
        localStorage.setItem('isLoggedIn', "true");
    };
    const setAdmin = () => {
        setIsAdmin("true");
        localStorage.setItem('isAdmin', "true");
    };
    const logOut = () => {
        setisLoggedIn(null);
        localStorage.clear();
        document.location.reload();
    };
    const Reload = () => {
        document.location.reload();
    };

  return (
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logOut={logOut}/>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/payment" element={<Payment/>} />
          <Route path="/video" element={<Video/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/lk" element={<LkMain isAdmin={isAdmin} isLoggedIn={isLoggedIn} is />} />
          <Route path="/event" element={<Event/>} />
          <Route path="/login"  element={<Login Reload={Reload} isLoggedIn={isLoggedIn} setAdmin={setAdmin} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>
          <Route path="/register" element={<Signin isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} logIn={logIn} />}/>

        </Routes>
      </BrowserRouter>

  );
}

export default App;
