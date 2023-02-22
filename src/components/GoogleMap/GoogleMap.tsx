import { Loader } from "@mantine/core";
import {
  GoogleMap as BaseGoogleMap,
  useLoadScript,
} from "@react-google-maps/api";
import { getGoogleMapApiKey } from "../../services/google-map-services";
import { GoogleMapLocation } from "./GoogleMapLocation";
import { Location } from "./types";

const defaultStyles = {
  container: {
    height: "300px",
    width: "100%",
  },
};

export type GoogleMapProps = {
  apiKey?: string;
  locations?: Location[];
  zoom?: number;
  center?: {
    lat: number;
    lng: number;
  };
};

export function GoogleMap({
  apiKey = getGoogleMapApiKey(),
  locations = [],
  center,
  zoom = 13,
}: GoogleMapProps) {
  // initializing google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: String(apiKey),
    libraries: [
      "drawing",
      "geometry",
      "localContext",
      "places",
      "visualization",
    ],
  });

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      <BaseGoogleMap
        id="map"
        zoom={zoom}
        mapContainerStyle={defaultStyles.container}
        center={center}
      >
        {locations.map((location, index) => (
          <GoogleMapLocation key={index} location={location} />
        ))}
      </BaseGoogleMap>
    </>
  );
}
