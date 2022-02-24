import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { saveUserLocation } from "../../store/actions/authAction";
import { useDispatch } from "react-redux";

const libraries = ["places"];
const mapContainerStyle = {
  width: "1200px",
  height: "800px",
};
const MapBox = (props) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const userLocation = {
    userlat: props.data?.lat,
    userLng: props.data?.lng,
  };
  const victim = {
    id: props.person?._id,
    name: props.person?.name,
    email: props.person?.email,
  };
  console.log("userLocation from map", userLocation);
  const coordinates = {
    lat: props.latitude,
    lng: props.longitude,
  };
  dispatch(saveUserLocation(coordinates));
  //loading required script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  //error checking | conditional rendering
  if (!isLoaded) return "Loading Maps";
  if (loadError) return "Error loading Maps";
  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={coordinates}
      >
        <Marker
          position={{ lat: props.latitude, lng: props.longitude }}
        ></Marker>
        {selected && (
          <InfoWindow
            position={{ lat: userLocation.userlat, lng: userLocation.userLng }}
            onCloseClick={() => setSelected(false)}
          >
            <div>
              <h2>{victim.name}</h2>
              <h3>{victim.email}</h3>
            </div>
          </InfoWindow>
        )}

        {userLocation && (
          <Marker
            position={{ lat: userLocation.userlat, lng: userLocation.userLng }}
            icon={{
              url: "/images/help.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            onClick={() => setSelected(true)}
          ></Marker>
        )}
      </GoogleMap>
    </>
  );
};

export default MapBox;
