import Logo from "../img/motorcycle.svg";

function Login(props) {
  return (
    <div className="fixed inset-0 w-full bg-white flex items-center">
      <div className="md:w-1/3 w-3/4 mx-auto shadow-lg p-6">
        <form>
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
            />
            <input
              className="h-10 px-2 outline-none border rounded-md mb-2
                        md:w-4/5 w-full"
              type="text"
              placeholder="Contraseña"
            />
            <button
              type="submit"
              className="rounded-md bg-amber-500 py-2 md:w-4/5 w-full text-white
                            shadow-md transition-all hover:text-black"
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
    </div>
  );
}

export default Login;
