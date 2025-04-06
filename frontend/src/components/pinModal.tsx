import { useMemo } from "react";
import usePins, { PinData } from "../hooks/usePins";

export default function PinModal({ pin }: { pin: PinData }) {
  const { reportPin } = usePins();

  const date = useMemo(() => {
    return new Date(pin.created_at).toLocaleString();
  }, [pin]);

  return (
    <div className="bg-licorice w-80 space-y-4 rounded-xl p-4 text-white shadow-lg">
      {/* Description */}
      <p className="text-papaya text-center text-base">{pin.description}</p>
      {/* Image */}
      <img
        src={pin.image}
        alt={pin.description}
        className="w-full rounded-md object-cover"
      />

      <p
        className="text-center text-lg font-bold"
        style={{
          color:
            pin.danger_level === "avoid"
              ? "var(--color-raspberry)"
              : pin.danger_level === "reconsider"
                ? "var(--color-vermillion)"
                : "var(--color-papaya)",
        }}
      >
        {pin.danger_level.toUpperCase()}
      </p>

      {/* Time Added */}
      <p className="text-french-gray text-sm">
        Added on <span className="text-white">{date}</span>
      </p>

      {/* Action Button */}
      <button
        onClick={() => reportPin(pin.id, pin.upvote + 1)}
        className="bg-raspberry hover:bg-vermillion w-full cursor-pointer rounded-md px-4 py-2 text-white transition"
      >
        Report it cleared ({pin.upvote}/2)
      </button>
    </div>
  );
}
