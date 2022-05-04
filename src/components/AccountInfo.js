import { useEffect, useState } from "react";

function AccountInfo({ user }) {
     const [readonly, setReadOnly] = useState(true);

	const[editname, setEditName] = useState();
	const[editapellido1, setEditApellido1] = useState();
	const[editapellido2, setEditApellido2] = useState();

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  function saveChanges(){
	  setReadOnly(true);
  }

  useEffect(()=>{
	  if(!isEmpty(user)){
		  setEditName(user.name);
		  setEditApellido1(user.apellido1);
		  setEditApellido2(user.apellido2);
	  }
  },[user]);

  return (
    !isEmpty(user) && (
      <div
        className="w-full flex flex-col justify-center items-center bg-white 
                    md:w-3/4 md:shadow-md"
      >
        <h1
          className="text-xl mt-4 w-full border-b text-center pb-2 font-poppins font-normal
                                                     "
        >
          Mi Cuenta
        </h1>
        <section
          className="w-full flex flex-col justify-center items-center bg-teal-50 px-1 
                                    md:w-3/6                                           md:bg-white"
        >
          <h2
            className="text-lg mb-2 w-full pl-2 mt-2 font-roboto font-light
                                                "
          >
            Imagen de la cuenta
          </h2>

          <img
            src={'https://picsum.photos/200'}
            className="w-32 h-32 rounded-full border-2"
            loading="lazy"
            alt="avatar"
          />
          <button className="px-3 py-1 bg-amber-500 rounded-md text-gray-100 shadow-md mt-2 mb-3">
            Editar
          </button>

          <h2
            className="text-lg mb-2 w-full pl-2 border-t pt-2  font-roboto font-light
                                                "
          >
            Datos personales
          </h2>

          <section
            className="flex flex-col  w-90p
                                        md:grid md:grid-cols-2 md:gap-2 md:w-4/5"
          >
            <div className="font-roboto ">Nombre de usuario</div>{" "}
            <div className="font-roboto font-extralight mx-4 md:mx-0">
              {user.username}
            </div>
            <div className="font-roboto ">Correo</div>{" "}
            <div className="font-roboto font-extralight mx-4 md:mx-0">
              {user.email}
            </div>
            <div className="font-roboto ">Nombre</div>{" "}
            <Input value={editname} handler={setEditName} readonly={readonly} />
             
            
            <div className="font-roboto ">Primer apellido</div>{" "}
            <Input value={editapellido1} handler={setEditApellido1} readonly={readonly} />
              
            <div className="font-roboto ">Segundo apellido</div>{" "}
            <Input value={editapellido2} handler={setEditApellido2} readonly={readonly} />
              
          </section>
          <div>
            <button className="px-3 py-1 rounded-md text-gray-800 shadow-md mt-5 mb-3 w-24 mr-2 bg-white "
		  	onClick={()=>setReadOnly(false)}>
              Editar
            </button>
            <button className="px-3 py-1 bg-white rounded-md text-gray-800 shadow-md mt-5 mb-3 w-24"
		  	onClick={saveChanges}>
              Guardar
            </button>
          </div>
        </section>
      </div>
    )
  );
}

const Input = ({ value, handler, readonly }) => (
	<input className="px-2 py-1 font-roboto font-extralight mx-4 md:mx-0 border rounded-md
				read-only:bg-transparent read-only:outline-none read-only:border-transparent"
		  	value={value} onChange={(e)=> handler(e.target.value)} readOnly={readonly} />
   );

export default AccountInfo;
