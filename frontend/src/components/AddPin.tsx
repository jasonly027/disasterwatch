import { Dispatch, DispatchWithoutAction, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import usePins, { DangerLevel } from "../hooks/usePins";

export default function AddPin() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => setVisible(true)}
        className="bg-licorice text-raspberry hover:text-vermillion fixed bottom-0 left-0 m-3 cursor-pointer rounded-xl px-3 text-6xl select-none"
      >
        +
      </button>
      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed top-0 left-0 h-screen w-screen"
        >
          <div
            className="fixed top-1/2 left-1/2 -translate-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <Modal onSubmitDone={() => setVisible(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function Modal({
  onSubmitDone = () => {},
}: {
  onSubmitDone?: DispatchWithoutAction;
}) {
  const { register, handleSubmit } = useForm();

  const { addPin } = usePins();

  const onSubmit = handleSubmit(
    (data) => {
      navigator.geolocation.getCurrentPosition(function onSuccess({
        coords: { latitude, longitude },
      }) {
        console.log(data);

        addPin({
          description: data.description as string,
          image: data.image[0] as File,
          coordinate: [latitude, longitude],
          danger_level: data.danger as DangerLevel,
        });
      });
      onSubmitDone();
    },
    (e) => {
      console.error(e);
      if (e.image) imageLabelRef.current?.focus();
    },
  );

  const imageLabelRef = useRef<HTMLLabelElement>(null);

  return (
    <div className="bg-licorice rounded-xl p-6 shadow-lg min-sm:w-80">
      <form onSubmit={onSubmit}>
        <label
          ref={imageLabelRef}
          tabIndex={0}
          htmlFor="image-input"
          className="text-french-gray mb-4 block w-full rounded-md border border-gray-300 px-3 py-2 text-center focus:border-2 focus:border-blue-500 focus:outline-none"
        >
          {isMobile() ? "Open Camera" : "Select Image"}
        </label>
        <input
          {...register("image", {
            required: true,
            validate: (data: FileList) => {
              const file = data[0];
              return file && file.type.startsWith("image/");
            },
          })}
          type="file"
          accept="image/*"
          capture="environment"
          id="image-input"
          className="hidden"
          onFocus={() => imageLabelRef.current?.focus()}
        />

        {/* Description Input */}
        <label className="text-french-gray mb-1 truncate text-sm font-medium">
          Describe your image
        </label>
        <input
          {...register("description", { required: true })}
          type="text"
          placeholder="Write something..."
          className="text-french-gray mb-4 w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* Dropdown */}
        <label className="text-french-gray mb-1 block text-sm font-medium">
          Danger Level
        </label>
        <select
          {...register("danger", { required: true })}
          defaultValue=""
          className="bg-licorice text-papaya mb-4 w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="minor">Minor Inconvenience</option>
          <option value="reconsider">Reconsider</option>
          <option value="avoid">Avoid!!!</option>
        </select>

        {/* Post Button */}
        <button
          type="submit"
          className="bg-raspberry hover:bg-vermillion w-full cursor-pointer rounded-md px-4 py-2 text-white transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
