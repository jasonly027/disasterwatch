import { createFileRoute } from "@tanstack/react-router";
import { Map } from "../components/Map";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Map />
    </div>
  );
}
