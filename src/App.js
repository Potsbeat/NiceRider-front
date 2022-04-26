import SideBar from "./components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./routes/Account";
import Clubs from "./routes/Clubs";
import Events from "./routes/Events";
import Login from "./routes/Login";

import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState({});
    
  const getRandomData = async () => {
      const res = await fetch('https://random-data-api.com/api/users/random_user');
      const data = await res.json();
      console.log(data);
      setUser(data);
  }

  useEffect(()=>{
      getRandomData();
  }, []);

  return (
    <div className="absolute inset-0 md:flex md:flex-row ">
      <BrowserRouter>
        <SideBar />
        <div className="w-full bg-gray-100">
          <Routes>
            <Route path="/" element={<Account user={user} />} />
            <Route path="clubs" element={<Clubs />} />
            <Route path="events" element={<Events />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
