import  Axios  from "axios";
import { useEffect, useRef, useState } from "react";
import  { useNavigate } from 'react-router-dom'
import getServerURL from '../serverlink';

import Logo from "../img/motorcycle.svg";

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [renderLogin, setRenderLogin] = useState(false);
  const navigate = useNavigate();
  const serverURL = useRef({});
  
  Axios.defaults.withCredentials = true;

  useEffect(()=>{
    serverURL.current = getServerURL();

    // Este get es para verificar si hay una sesión guardada
    Axios.get(`http://${serverURL.current.ip}:${serverURL.current.port}/login`).then((response)=>{
      console.log(response.data);
      response.data.isLogged ? navigate('/', { replace: true }) :
        setRenderLogin(true);

    });

  },[]);

  const login = () => { // Este login es para loguear si no hay una sesión guardada
    
    Axios.post(`http://${serverURL.current.ip}:${serverURL.current.port}/login`,{
      username: username,
      password: password
    }).then((response) => {
      console.log(response);
      if(response.data.message)
        setLoginMessage(response.data.message);
      else
        navigate('/', { replace: true });
    });
    
  }


  return (
    renderLogin ? 
    <div className="fixed inset-0 w-full bg-white flex items-center">
      <div className="md:w-1/3 w-3/4 mx-auto shadow-lg p-6">
        <form onSubmit={e => e.preventDefault()}>
          <div className="flex flex-col items-center">
            <img
              src={Logo}
              alt="NiceRider logo"
              className="md:w-44 w-28 mt-2 mb-5"
            />
            <input
              className="h-10 px-2 outline-none border rounded-md mb-2
                        md:w-4/5 w-full"
              type="text"
              placeholder="Nombre de usuario"

              onChange={e => setUsername(e.target.value)}

            />
            <input
              className="h-10 px-2 outline-none border rounded-md mb-2
                        md:w-4/5 w-full"
              type="password"
              placeholder="Contraseña"

              onChange={e => setPassword(e.target.value)}
            />

            <span className="text-red-900 mb-1">{loginMessage}</span>

            <button
              type="submit"
              className="rounded-md bg-amber-500 py-2 md:w-4/5 w-full text-white
                            shadow-md transition-all hover:text-black"
              
              onClick={login}
            >
              Ingresar
            </button>
            <hr className="w-4/5 my-2" />
            <button
              type="submit"
              className="rounded-md border py-2 md:w-4/5 w-full
                            shadow-md transition-all
                            hover:bg-slate-100"
            >
              Crear Cuenta
            </button>
          </div>
        </form>
      </div>
    </div> :

    <div>
      
    </div>
  );
}

export default Login;
