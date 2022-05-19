import { GoogleMap } from "@react-google-maps/api";

function Map(props) {
    return (
        <>
            <GoogleMap zoom={10} center={{ lat: 45, lng: 30 }} mapContainerClassName="w-full h-full"></GoogleMap>
        </>
    );
}

export default Map;