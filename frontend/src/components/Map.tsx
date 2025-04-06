import {
  AdvancedMarker,
  Map as GMap,
  InfoWindow,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useRef, useState } from "react";
import usePins, { PinData } from "../hooks/usePins";
import PinModal from "./PinModal";

export function Map() {
  const doPan = useRef(true);

  const { pins } = usePins();

  return (
    <GMap
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      defaultZoom={15}
      onTilesLoaded={({ map }) => {
        if (!doPan.current) return;

        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude: lat, longitude: lng } }) => {
            map?.panTo({ lat, lng });
          },
        );

        doPan.current = false;
      }}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      mapId="739af084373f96fe"
      className="size-full"
    >
      {pins.map((pin) => (
        <Marker key={pin.id} pin={pin} />
      ))}
    </GMap>
  );
}

function Marker({ pin }: { pin: PinData }) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setShowInfo((prev) => !prev)}
        position={{ lat: pin.latitude, lng: pin.longitude }}
      >
        <Pin background="#d81e5b" borderColor="#f0544f" glyphColor="#140316" />
      </AdvancedMarker>

      {showInfo && (
        <InfoWindow
          headerDisabled
          anchor={marker}
          onClose={() => setShowInfo(false)}
          className="bg-licorice"
        >
          <PinModal pin={pin} />
        </InfoWindow>
      )}
    </>
  );
}
