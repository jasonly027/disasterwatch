const time = "2 hours"; 

export default function PinModal() {
  return (
    <div className="bg-licorice p-4 rounded-xl shadow-lg w-80 text-white space-y-4">
        {/* Description */}
        <p className="text-base text-papaya text-center">
            Death
        </p>
        {/* Image */}
        <img
            src="https://i.pinimg.com/736x/2b/a1/80/2ba1803116d0d06ad1d937f3d5483bf6.jpg"
            alt="Hazard snapshot"
            className="w-full object-cover rounded-md"
        />

      {/* Time Added */}
      <p className="text-sm text-french-gray">
        Added <span className="text-white">{time}</span> ago
      </p>

      {/* Action Button */}
      <button className="w-full bg-raspberry text-white py-2 px-4 rounded-md hover:bg-vermillion transition">
        Report it cleared.
      </button>
    </div>
  );
}
