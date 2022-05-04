import SideBar from "./components/SideBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import Account from "./routes/Account";
import Clubs from "./routes/Clubs";
import Events from "./routes/Events";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import getServerURL from "./serverlink";

import { useEffect, useRef, useState } from "react";
import Axios from "axios";

function App() {
  const serverURL = useRef({});

  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  useEffect(() => {

    serverURL.current = getServerURL();

    // Este get es para verificar si hay una sesión guardada
    Axios.get(
      `http://${serverURL.current.ip}:${serverURL.current.port}/login`
    ).then((response) => {
      if (!response.data.isLogged) {
        navigate("/login", { replace: true });
      } else {
        console.log(response.data);
        setIsLogged(true);
        setUser(response.data.user[0])
      }
    });
  }, [navigate]);

  return (
    <>
      <div className="absolute inset-0 md:flex md:flex-row ">
        {isLogged && <SideBar />}
        <div className="w-full bg-gray-100 overflow-auto">
          <Routes>
            { isLogged && <>
            <Route path="account" element={<Account user={user} />} />
            <Route path="clubs" element={<Clubs />} />
            <Route path="events" element={<Events />} />
            </>}
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
