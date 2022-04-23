import SideBar from "./components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "./routes/Account";
import Clubs from "./routes/Clubs";
import Events from "./routes/Events";
import Login from "./routes/Login";

function App() {
  return (
    <div className="absolute inset-0 md:flex md:flex-row ">
      <BrowserRouter>
        <SideBar />
        <div className="w-full ">
          <Routes>
            <Route path="/" element={<Account />} />
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
