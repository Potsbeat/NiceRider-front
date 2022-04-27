

function AccountInfo({user}) {

    //const [enableEdit, setEnableEdit] = useState(false);
    
    function isEmpty (obj) {
        return Object.keys(obj).length === 0;
    }

    return (
        
        !isEmpty(user) &&

        <div className="w-full flex flex-col justify-center items-center bg-white 
                    md:w-3/4 md:shadow-md">
                <h1 className="text-xl mt-4 w-full border-b text-center pb-2 font-poppins font-normal
                                                     ">
                                            Mi Cuenta</h1>
                <section className="w-full flex flex-col justify-center items-center bg-teal-50 px-1 
                                    md:w-3/6                                           md:bg-white">
                    
                    <h2 className="text-lg mb-2 w-full pl-2 mt-2 font-roboto font-light
                                                ">
                                            Imagen de la cuenta</h2>
                    
                    <img src={user.picture.large} className="w-32 h-32 rounded-full border-2" loading="lazy" alt="avatar" />
                    <button className="px-3 py-1 bg-amber-500 rounded-md text-gray-100 shadow-md mt-2 mb-3" >Editar</button>
                    
                    <h2 className="text-lg mb-2 w-full pl-2 border-t pt-2  font-roboto font-light
                                                ">
                                            Datos personales</h2>

                    <section className="flex flex-col  w-90p
                                        md:grid md:grid-cols-2  md:w-4/5">

                        <div className="font-roboto ">Nombre</div> <div className="font-roboto font-extralight mx-4 md:mx-0">{user.name.first}</div>
                        <div className="font-roboto mt-1">Primer apellido</div> <div className="font-roboto font-extralight mx-4 md:mx-0">{user.name.last}</div>
                        <div className="font-roboto mt-1">Segundo apellido</div> <div className="font-roboto font-extralight mx-4 md:mx-0">{user.name.first}</div>
                    </section>
                </section>
        </div>
    );
}

export default AccountInfo;