import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function LoginDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const handleMouseEnter = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({ top: rect.bottom, left: rect.left, width: rect.width });
    setIsOpen(true);
  };

  return (
    <div className="relative">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsOpen(false)}
        className="bg-white text-gray-700 px-4 py-2 rounded-md shadow-md flex items-center gap-2 border hover:bg-gray-100"
      >
        Log in <span className="ml-1">▼</span>
      </button>

      {isOpen && (
        <div
          className="fixed bg-white shadow-lg rounded-lg p-2 border z-50 w-48"
          style={{ top: position.top, left: position.left, width: position.width }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-2">
            <p className="text-gray-600 font-semibold px-4">Patients</p>
            <NavLink to='/login'>
            <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
              Log in
            </button>
            </NavLink>
          </div>
          <hr />
          <div className="py-2">
            <p className="text-gray-600 font-semibold px-4">Doctors</p>
            <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
              Log in
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
