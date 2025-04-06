export default function Modal() {
    return (
        <div className="bg-licorice p-6 rounded-xl shadow-lg w-80">

            {/* Description Input */}
            <label className="block text-sm font-medium mb-1 text-french-gray">Describe your image</label>
            <input
            type="text"
            placeholder="Write something..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-french-gray"
            />

            {/* Dropdown */}
            <label className="block text-sm font-medium mb-1 text-french-gray">Danger Level</label>
            <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 bg-licorice text-papaya placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <option disabled selected>Select an option</option>
            <option>Minor Inconvnience</option>
            <option>Reconsider</option>
            <option>Avoid!!!</option>
            </select>

            {/* Post Button */}
            <button
            className="w-full bg-raspberry text-white py-2 px-4 rounded-md hover:bg-vermillion transition"
            >
            Post
            </button>
        </div>
    );
  }