import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/header";
import { APIProvider } from "@vis.gl/react-google-maps";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex h-screen flex-col">
        <APIProvider apiKey={import.meta.env.VITE_GMAP_KEY}>
          <Header />
          <Outlet />
        </APIProvider>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
