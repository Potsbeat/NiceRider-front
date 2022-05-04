import  Axios  from "axios";
import getServerURL from '../serverlink';
import  { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from "react";

function Logout(props) {
    Axios.defaults.withCredentials = true;
    
    const serverURL = useRef({});
    const navigate = useNavigate();
  

    useEffect(()=>{
        serverURL.current = getServerURL();
    
        Axios.post(`http://${serverURL.current.ip}:${serverURL.current.port}/logout`)
        .then((response)=>{
            navigate('/login', { replace: true });           
        });

      },[]);

    return (
        <div>
            
        </div>
    );
}

export default Logout;