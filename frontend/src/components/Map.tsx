import { Map as GMap } from "@vis.gl/react-google-maps";

export function Map() {
  return (
    <GMap
      className="size-full"
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      defaultZoom={3}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      mapId="739af084373f96fe"
    />
  );
}
