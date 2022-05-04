import { RiMotorbikeLine } from "react-icons/ri";
import { MdOutlineSportsMotorsports, MdEvent } from "react-icons/md";
import { Link } from "react-router-dom";
//import { ReactComponent as MotoIcon} from "../img/moto-icon.svg"

function SideBar() {
  return (
   
    <div
      className="
            md:flex md:flex-col md:text-center md:static md:justify-start md:w-20 md:h-full md:border-r md:shadow-md
            flex flex-row justify-evenly fixed bottom-0 w-full  items-center bg-white"
    >
      <SideBarIcon
        icon={<MdOutlineSportsMotorsports className="md:text-4xl text-2xl" />}
        text={"Cuenta"}
        path={"/account"}
      />

      <SideBarIcon
        icon={<RiMotorbikeLine className="md:text-4xl text-2xl" />}
        text={"Motoclubs"}
        path={"/clubs"}
      />

      <SideBarIcon
        icon={<MdEvent className="md:text-4xl text-2xl" />}
        text={"Eventos"}
        path={"/events"}
      />
      
      {/*
     <SideBarIcon
        icon={<MotoIcon className="fill-blue-600 w-full h-6" />}
        text={"Eventos"}
        path={"/events"}
      /> 
    */}
        <Link className="md:mt-auto md:mb-2 md:block hidden" to='logout' >
          <p className="md:text-xs md:px-2 md:text-gray-800">Cerrar sesión</p>
        </Link>
    </div>
   
  );
}

const SideBarIcon = ({ icon, text, path }) => (
  <Link
    to={path}
    className=" 
      flex flex-col justify-center items-center text-amber-800 py-2 w-full border-t
      md:border-b md:border-t-0
      hover:cursor-pointer hover:bg-gray-200 transition-colors"
  >
    {icon}

    <span className=" font-extralight font-roboto text-xs mt-1 md:block text-gray-800 ">
      {text}
    </span>
  </Link>
);

export default SideBar;
