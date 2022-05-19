import { useState } from "react";
import DatePicker from "./DatePicker";
import  Axios  from "axios";
import  { useNavigate } from 'react-router-dom'

function CreateAccountForm({ loginFunction }) {
  Axios.defaults.withCredentials = true;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [ap, setAp] = useState("");
  const [am, setAm] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [queryMessage, setQueryMessage] = useState("");

  const navigate = useNavigate();

  function dateValidation(dateStr) {
    
    const regex = /^\d{4}-\d{2}-\d{2}$/gm;

    if (dateStr.match(regex) === null) {
     
      return false;
    }

    const date = new Date(dateStr);

    const timestamp = date.getTime();

    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
      
      return false;
    }
   
    return date.toISOString().startsWith(dateStr);
  }

  function lengthValidation(){
    if(email.trim().length < 1) return 'El correo no puede estar vacío';
    if(username.trim().length < 1) return 'El nombre de usuario no puede estar vacío';
    if(name.trim().length < 1) return 'El nombre no puede estar vacío';
    if(ap.trim().length < 1) return 'El primer apellido no puede estar vacío';
    if(am.trim().length < 1) return 'El segundo apellido no puede estar vacío';
    if(phone.trim().length < 1) return 'El número telefónico no puede estar vacío';
    if(password.trim().length < 6) return 'La contraseña debe tener al menos 6 caracteres';

    return '';
  }

  function passwdValidation(passwd1, passwd2){
    return passwd1 == passwd2;
  }

  const createAccount = () => {

    let isLengthValid = lengthValidation();

    if(isLengthValid.length > 0){
      setQueryMessage(isLengthValid);
      return;
    }

    if(!dateValidation(birthDate)){
      setQueryMessage('La fecha de nacimiento no es válida');
      return;
    }

    if(!passwdValidation(password, password2)){
      setQueryMessage('Las contraseñas no coinciden');
      return;
    }

    Axios.post(`http://${process.env.REACT_APP_BACKEND}/createAccount`,{
      email: email.trim(),
      username: username.trim(),
      name: name.trim(),
      ap: ap.trim(),
      am: am.trim(),
      phone: phone.trim(),
      birthDate: birthDate.trim(),
      password: password.trim(),
      

    }).then((response) => {
      
      if(response.data.error)
        setQueryMessage(response.data.error);
      else
        loginFunction(email.trim(), password.trim(),setQueryMessage, navigate);
    });
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col items-center"
    >
      <Input type="text" holder="Correo electrónico" setFunction={setEmail} />

      <Input type="text" holder="Nombre de usuario" setFunction={setUsername} />

      <Input type="text" holder="Nombre" setFunction={setName} />

      <Input type="text" holder="Primer Apellido" setFunction={setAp} />

      <Input type="text" holder="Segundo Apellido" setFunction={setAm} />

      <Input type="tel" holder="Teléfono" setFunction={setPhone} />

      <div className="flex flex-wrap md:w-4/5 mb-2">
        <p className="font-roboto font-light">Fecha de nacimiento: </p>
        <DatePicker setDate={setBirthDate} />
      </div>

      <Input type="password" holder="Contraseña" setFunction={setPassword} />

      <Input
        type="password"
        holder="Confirmar Contraseña"
        setFunction={setPassword2}
      />

      <span className="text-red-900 mb-1">{queryMessage}</span>

      <button
        type="submit"
        className="rounded-md bg-amber-500 py-2 md:w-4/5 w-full text-white
                            shadow-md transition-all hover:text-black"
        onClick={createAccount}
      >
        Confirmar
      </button>
      <hr className="w-4/5 my-2" />
    </form>
  );
}

const Input = ({ type, holder, setFunction }) => (
  <input
    className="h-10 px-2 outline-none border rounded-md mb-2 font-roboto font-light
                        md:w-4/5 w-full"
    type={type}
    placeholder={holder}
    onChange={(e) => setFunction(e.target.value)}
  />
);

export default CreateAccountForm;
