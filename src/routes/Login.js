import  Axios  from "axios";
import { useEffect,  useState } from "react";
import  { useNavigate } from 'react-router-dom'
import svinfo from '../serverlink';

import Logo from "../img/motorcycle.svg";
import CreateAccountForm from "../components/CreateAccountForm";

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [renderLogin, setRenderLogin] = useState(false);

  const [activeForm, setActiveForm] = useState('login');
  const navigate = useNavigate();
  
  Axios.defaults.withCredentials = true;

  useEffect(()=>{
    console.log(`http://${svinfo.ip}:${svinfo.port}/login`);

    // Este get es para verificar si hay una sesión guardada
    Axios.get(`http://${svinfo.ip}:${svinfo.port}/login`).then((response)=>{
      console.log(response.data);
        if(response.data.isLogged){
          navigate('/account', { replace: true });
        }else{
          setRenderLogin(true);
        }
        

    });

  },[]);

  const login = () => { // Este login es para loguear si no hay una sesión guardada
    
    Axios.post(`http://${svinfo.ip}:${svinfo.port}/login`,{
      email: email,
      password: password
    }).then((response) => {
      console.log(response);
      if(response.data.message)
        setLoginMessage(response.data.message);
      else
        navigate('/account', { replace: true });
    });
    
  }

  const handleCreateAccountButton = () =>{
    activeForm == 'login' ? setActiveForm('create') : setActiveForm('login')
  }


  return (
    renderLogin ? 
    <div className="fixed inset-0 w-full bg-white flex items-center justify-center overflow-auto">
      <div className="flex flex-col md:w-1/3 w-4/5  shadow-lg p-6 ">
      <img
              src={Logo}
              alt="NiceRider logo"
              className="self-center md:w-44 w-28 mt-2 mb-5"
            />
        {activeForm == 'login' ? 
        <form onSubmit={e => e.preventDefault()}>
          <div className="flex flex-col items-center">
            
            <input
              className="h-10 px-2 outline-none border rounded-md mb-2
                        md:w-4/5 w-full"
              type="text"
              placeholder="Correo electrónico"

              onChange={e => setEmail(e.target.value)}

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
            
          </div>
        </form> : 
        <CreateAccountForm />
        }
        <button
              
              className="self-center rounded-md border py-2 md:w-4/5 w-full
                            shadow-md transition-all
                            hover:bg-slate-100"

              onClick={handleCreateAccountButton}
            >
              {activeForm == 'login' ? 'Crear cuenta' : 'Cancelar'}
            </button>
      </div>
    </div> :

    <div>
      
    </div>
  );
}

export default Login;
