import  Axios  from "axios";
import svinfo from '../serverlink';
import  { useNavigate } from 'react-router-dom'
import { useEffect } from "react";

function Logout() {
    Axios.defaults.withCredentials = true;
    
   
    const navigate = useNavigate();
  

    useEffect(()=>{
       
    
        Axios.post(`http://${svinfo.ip}:${svinfo.port}/logout`)
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