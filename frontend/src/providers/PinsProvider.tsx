import { ReactNode } from "@tanstack/react-router";
import { PinData, PinPayload, PinsContext, PinsValue } from "../hooks/usePins";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function PinsProvider({ children }: { children?: ReactNode }) {
  const [pins, setPins] = useState<PinData[]>([]);

  const addPin = useCallback(
    async ({ description, image, coordinate, danger_level }: PinPayload) => {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", image);
      formData.append("latitude", coordinate[0].toString());
      formData.append("longitude", coordinate[1].toString());
      formData.append("danger_level", danger_level);

      const res = await fetch("http://localhost:8080/api/v1/add_pin", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) console.error("Error submitting pin", res.status);

      await getPins();
    },
    [],
  );

  const getPins = useCallback(async () => {
    const res = await fetch("http://localhost:8080/api/v1/get_pin");
    if (!res.ok) {
      console.error("Failed to fetch pins", res.status);
      return;
    }
    const pins: PinData[] = await res.json();

    setPins(pins.filter((p) => p.upvote <= 1));
  }, []);

  const reportPin = useCallback(async (id: number, upvote: number) => {
    const res = await fetch("http://localhost:8080/api/v1/report_pin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, upvote }),
    });
    if (!res.ok) {
      console.error("Failed to report pin", res.status);
      return;
    }

    await getPins();
  }, []);

  useEffect(() => {
    getPins().then();
  }, []);

  const pinsValue: PinsValue = useMemo(
    () => ({
      pins,
      addPin,
      getPins,
      reportPin,
    }),
    [addPin, getPins, pins, reportPin],
  );

  return (
    <PinsContext.Provider value={pinsValue}>{children}</PinsContext.Provider>
  );
}
