import { createContext, Dispatch, useContext } from "react";

export type Coordinate = [latitude: number, longitude: number];

/** Info on a pin received by server */
export type PinData = {
  description: string;
  image: string;
  upvote: number;
  coordinate: Coordinate;
  danger_level: "minor" | "avoid" | "danger";
};

/** Info necessary to post a new Pin */
export type PinPayload = {
  description: string;
  image: File;
  coordinate: Coordinate;
  danger_level: "minor" | "avoid" | "danger";
};

export const PinsContext = createContext<PinsValue | undefined>(undefined);

export type PinsValue = {
  pins: PinData[];
  /** Submit a pin to the server */
  addPin: Dispatch<PinPayload>;
  /** Get pins near coord within the radius */
  getPins: (coord: Coordinate, radius: number) => void;
};

export default function usePins() {
  const ctx = useContext(PinsContext);
  if (ctx === undefined) {
    throw new Error("");
  }
  return ctx;
}
