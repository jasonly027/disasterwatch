import { ReactNode } from "@tanstack/react-router";
import { PinData, PinPayload, PinsContext, PinsValue } from "../hooks/usePins";
import { useCallback, useMemo, useState } from "react";

export default function PinsProvider({ children }: { children?: ReactNode }) {
  const [pins, setPins] = useState<PinData[]>([]);

  const addPin = useCallback(async (pin: PinPayload) => {
    const res = await fetch("http://localhost:8080/api/v1/add_pin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pin),
    });
    if (!res.ok) console.error("Error submitting pin", res.status);

    await getPins();
  }, []);

  const getPins = useCallback(async () => {
    const res = await fetch("http://localhost:8080/api/v1/get_pin");
    if (!res.ok) {
      console.error("Failed to fetch pins", res.status);
      return;
    }

    const pins = JSON.parse(await res.json());
    setPins(pins);
  }, []);

  const pinsValue: PinsValue = useMemo(
    () => ({
      pins,
      addPin,
      getPins,
    }),
    [addPin, getPins],
  );

  return (
    <PinsContext.Provider value={pinsValue}>children</PinsContext.Provider>
  );
}
