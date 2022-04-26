import { useState } from "react";

function AccountInfo({user}) {

    const [enableEdit, setEnableEdit] = useState(false);

    return (
        <div className="w-full flex flex-col justify-center items-center bg-white
                    md:w-3/4">

                <section className="grid grid-rows-4 grid-cols-2 w-full
                                                                md:w-3/6">
                    
                        <p className="border">Nombre:</p><input type="text" className="border" value={user.first_name} readOnly={!enableEdit} /> 
                   
                   
                        <p className="border ">Nombre de usuario:</p><p className="border ">{user.username}</p>
                  
                
                        <p className="">Correo:</p><p className="">{user.email}</p>
               
                    
                        <p className="">Fecha de nacimiento</p><p className="">{user.date_of_birth}</p>

                </section>
                <button onClick={()=> setEnableEdit(!enableEdit)} > { enableEdit ? 'Guardar' : 'Editar' }  </button>
                
            
        </div>
    );
}

export default AccountInfo;