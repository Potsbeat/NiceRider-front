import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/Map";

function HomeMap(props) {


    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_API,
        libraries: ["places"]
    })


    if(!isLoaded) 
        return <div>Cargando...</div>

    return (
        <div className="h-full w-full bg-white flex flex-wrap ">
            <section className="w-1/2 h-full">
                <Map />
            </section>

            <section>
                
            </section>            
        </div>
    );
}

export default HomeMap;