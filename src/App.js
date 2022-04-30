import SideBar from "./components/SideBar";
import {  Routes, Route, useNavigate } from "react-router-dom";
import Account from "./routes/Account";
import Clubs from "./routes/Clubs";
import Events from "./routes/Events";
import Login from "./routes/Login";

import getServerURL from './serverlink';

import { useEffect, useRef, useState } from "react";
import Axios from "axios";

function App() {
  const serverURL = useRef({});
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const getRandomData = async () => {
      const res = await fetch('https://randomuser.me/api/');
      const data = await res.json();
      console.log(data.results[0]);
      setUser(data.results[0]);
  }

  useEffect(()=>{
      getRandomData();
      serverURL.current = getServerURL();

      // Este get es para verificar si hay una sesión guardada
      Axios.get(`http://${serverURL.current.ip}:${serverURL.current.port}/login`).then((response)=>{
          if(!response.data.isLogged) { navigate('/login', { replace: true });  } else { setIsLogged(true); console.log(response.data) };
        });
      }, []);

  return (
    isLogged ? 
    <div className="absolute inset-0 md:flex md:flex-row ">
      
        <SideBar />
        <div className="w-full bg-gray-100">
          <Routes>
            <Route path="/" element={<Account user={user} />} />
            <Route path="clubs" element={<Clubs />} />
            <Route path="events" element={<Events />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      
    </div> :
    
    <div>
      <p className="text-center">Cargando...</p>
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
