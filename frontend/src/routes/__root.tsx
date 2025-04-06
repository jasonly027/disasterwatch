import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/Header";
import { APIProvider } from "@vis.gl/react-google-maps";
import PinsProvider from "../providers/PinsProvider";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex h-screen flex-col">
        <APIProvider apiKey={import.meta.env.VITE_GMAP_KEY}>
          <PinsProvider>
            <Header />
            <Outlet />
          </PinsProvider>
        </APIProvider>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
