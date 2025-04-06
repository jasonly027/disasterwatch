import { createFileRoute } from "@tanstack/react-router";
import { Map } from "@vis.gl/react-google-maps";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </div>
  );
}
