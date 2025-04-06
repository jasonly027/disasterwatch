import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "../components/header";
import { APIProvider } from "@vis.gl/react-google-maps";
import Modal from "../components/modal";
import PinModal from "../components/pinModal";
import SearchFilter from "../components/searchAndFilter";


export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex h-screen flex-col">
        <APIProvider apiKey={import.meta.env.VITE_GMAP_KEY}>
          <Header />
          <Modal />
          <PinModal />
          <SearchFilter />
          <Outlet />
        </APIProvider>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
