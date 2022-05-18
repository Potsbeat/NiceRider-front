import Axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import svinfo from "../serverlink";

function AccountInfo({ user }) {
  const [readonly, setReadOnly] = useState(true);
  const [userdata, setUserdata] = useState(null);
  const [saveStatusMessage, setSaveStatusMessage] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editname, setEditName] = useState("");
  const [editapellido1, setEditApellido1] = useState("");
  const [editapellido2, setEditApellido2] = useState("");
  const [editPhone, setEditPhone] = useState("");

  Axios.defaults.withCredentials = true;

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  function enableEdit() {
    setSaveStatusMessage("");
    setReadOnly(!readonly);
  }

  function validateData() {
    const values = [
      editUsername,
      editname,
      editapellido1,
      editapellido2,
      editPhone,
    ];

    let filter1 = values.filter((val) => val.trim());

    if (filter1.length < 5) {
      return false;
    }

    return true;
  }

  function formatDate(inp){
    let date = new Date(inp);
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return date.toLocaleDateString(undefined, options);
  }

  function saveChanges() {
    if (validateData()) {
      setSaveStatusMessage("Guardando...");
      Axios.put(`http://${svinfo.ip}:${svinfo.port}/update`, {
        email: user.correo,
        username: editUsername.trim(),
        name: editname.trim(),
        apellido1: editapellido1.trim(),
        apellido2: editapellido2.trim(),
        phone: editPhone.trim(),
      }).then((response) => {
        console.log(response.data);
        setSaveStatusMessage(response.data.message);
      });

      setReadOnly(true);
    } else {
      setSaveStatusMessage("No puede haber campos vacíos.");
    }
  }

  useEffect(() => {
    //console.log(user);
    Axios.get(`http://${svinfo.ip}:${svinfo.port}/userinfo`, {
      params: { email: user.correo },
    }).then((response) => {
      const userdata2 = response.data.userdata;
      setUserdata(response.data.userdata);

      setEditUsername(userdata2.apodo);
      setEditName(userdata2.nombre);
      setEditApellido1(userdata2.ap);
      setEditApellido2(userdata2.am);
      setEditPhone(userdata2.telefono);
    });
  }, [user]);

  return (
    !isEmpty(user) && (
      <div
        className="w-full flex flex-col  items-center bg-white 
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
          <SectionTitle>
            Imagen de la cuenta
          </SectionTitle>

          <img
            src={"https://picsum.photos/200"}
            className="w-32 h-32 rounded-full border-2"
            loading="lazy"
            alt="avatar"
          />
          <button className="px-3 py-1 bg-amber-500 rounded-md text-gray-100 shadow-md mt-2 mb-3">
            Editar
          </button>

          <SectionTitle>
            Datos personales
          </SectionTitle>

          <Section>
            <Title>Correo</Title> <Info>{user.correo}</Info>
            <Title>Nombre de usuario</Title>{" "}
            <Input
              value={editUsername}
              handler={setEditUsername}
              readonly={readonly}
            />
            <Title>Nombre</Title>{" "}
            <Input value={editname} handler={setEditName} readonly={readonly} />
            <Title>Primer apellido</Title>{" "}
            <Input
              value={editapellido1}
              handler={setEditApellido1}
              readonly={readonly}
            />
            <Title>Segundo apellido</Title>{" "}
            <Input
              value={editapellido2}
              handler={setEditApellido2}
              readonly={readonly}
            />
            <Title>Número telefónico</Title>{" "}
            <Input
              value={editPhone}
              handler={setEditPhone}
              readonly={readonly}
            />
            <Title>Fecha de nacimiento</Title>
            <Info>{userdata && formatDate(userdata.fechanac)} </Info>
          </Section>
          <span className="text-sm mt-2 text-lime-700">
            {saveStatusMessage}
          </span>
          <div>
            <button
              className="px-3 py-1 rounded-md text-gray-800 shadow-md mt-5 mb-3 w-24 mr-2 bg-white "
              onClick={enableEdit}
            >
              Editar
            </button>
            <button
              className="px-3 py-1 bg-white rounded-md text-gray-800 shadow-md mt-5 mb-3 w-24"
              onClick={saveChanges}
            >
              Guardar
            </button>
          </div>

          <SectionTitle> Datos de viajes </SectionTitle>
          <Section>
            <Title>Kilómetros totales</Title>
            <Info>{userdata && userdata.kmtotales}</Info>

            <Title>Velocidad promedio</Title>
            <Info>{userdata && userdata.velocidadpromedio} km/h</Info>

            <Title>Tiempo de viaje</Title>
            <Info>{userdata && userdata.tiempoviaje} h</Info>
          </Section>

          <Link to="/logout" className="self-end">
          <button
              className="font-roboto font-normal text-sm mt-2 bg-transparent text-cyan-900 mb-14"
            >
              Cerrar sesión
            </button>
          </Link>
        </section>
      </div>
    )
  );
}

const Input = ({ value, handler, readonly }) => (
  <input
    className="px-2 py-1 font-roboto font-extralight mx-4 md:mx-0 border rounded-md
				read-only:bg-transparent read-only:outline-none read-only:border-transparent"
    value={value}
    onChange={(e) => handler(e.target.value)}
    readOnly={readonly}
  />
);

const Section = ({ children }) => (
  <section
    className="flex flex-col  w-4/5
                      md:grid md:grid-cols-2 md:gap-2 md:w-4/5"
  >
    {children}
  </section>
);

const Title = ({ children }) => (
  <div className="font-roboto mt-1">{children}</div>
);

const Info = ({ children }) => (
  <div className="font-roboto font-extralight mx-4 md:mx-0 px-2 py-1">
    {children}
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-lg mb-2 w-full pl-2 border-t pt-2  font-roboto font-light">
    {children}
  </h2>
);

export default AccountInfo;
