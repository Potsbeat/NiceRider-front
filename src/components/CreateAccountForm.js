import { useState } from "react";
function CreateAccountForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [queryMessage, setQueryMessage] = useState("");
  
  function dateValidation(str){
    const date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!(date_regex.test(str))) {
        return false;
    }
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col items-center"
    >
      <Input type="text" holder="Correo electrónico" setFunction={setEmail} />

      <Input type="text" holder="Nombre de usuario" setFunction={setEmail} />

      <Input type="text" holder="Nombre" setFunction={setEmail} />

      <Input type="text" holder="Primer Apellido" setFunction={setEmail} />

      <Input type="text" holder="Segundo Apellido" setFunction={setEmail} />

      <Input type="tel" holder="Teléfono" setFunction={setEmail} />

      <input type="date"  ></input>

      <Input type="password" holder="Contraseña" setFunction={setPassword} />

      <span className="text-red-900 mb-1">{queryMessage}</span>

      <button
        type="submit"
        className="rounded-md bg-amber-500 py-2 md:w-4/5 w-full text-white
                            shadow-md transition-all hover:text-black"
        onClick={() => null}
      >
        Confirmar
      </button>
      <hr className="w-4/5 my-2" />
    </form>
  );
}

const Input = ({ type, holder, setFunction }) => (
  <input
    className="h-10 px-2 outline-none border rounded-md mb-2
                        md:w-4/5 w-full"
    type={type}
    placeholder={holder}
    onChange={(e) => setFunction(e.target.value)}
  />
);

export default CreateAccountForm;
