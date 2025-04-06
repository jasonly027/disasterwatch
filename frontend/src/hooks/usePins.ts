import { createContext, Dispatch, useContext } from "react";

export type Coordinate = [latitude: number, longitude: number];

export type DangerLevel = "minor" | "reconsider" | "avoid";

/** Info on a pin received by server */
export type PinData = {
  id: number;
  created_at: string;
  description: string;
  image: string;
  upvote: number;
  latitude: number;
  longitude: number;
  danger_level: DangerLevel;
};

/** Info necessary to post a new Pin */
export type PinPayload = {
  description: string;
  image: File;
  coordinate: Coordinate;
  danger_level: DangerLevel;
};

export const PinsContext = createContext<PinsValue | undefined>(undefined);

export type PinsValue = {
  pins: PinData[];
  /** Submit a pin to the server */
  addPin: Dispatch<PinPayload>;
  /** Get pins near coord within the radius */
  getPins: (coord: Coordinate, radius: number) => void;
  /** Report pin (by id) to be cleared */
  reportPin: (id: number, upvote: number) => void;
};

export default function usePins() {
  const ctx = useContext(PinsContext);
  if (ctx === undefined) {
    throw new Error("");
  }
  return ctx;
}
