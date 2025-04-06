export default function SearchBarFilter() {
    return (
      <div className="flex items-center space-x-4 w-full max-w-xl mx-auto p-4">
        
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search hazards..."
          className="flex-1 border border-raspberry rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-vermillion bg-gray-900 text-papaya"
        />
  
        {/* Radius Dropdown */}
        <select
        className="border border-raspberry bg-gray-900 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-vermillion text-papaya"
        defaultValue=""
        >
          <option value="" disabled>
            Radius
          </option>
          <option value="2">2 miles</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="20">20 miles</option>
        </select>
      </div>
    );
  }
  