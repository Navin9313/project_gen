// import React from "react";

// const Asider = () => {
//     return(
//         <div>

//         </div>
//     )
// }

// export default Asider;

import React, { useState } from "react";
import { 
  FaHome, 
  FaBoxOpen, 
  FaImage, 
  FaUsers, 
  FaCog, 
  FaBars 
} from "react-icons/fa";

const Asider = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <div
        className={`h-screen bg-gray-900 text-white transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && <h1 className="text-xl font-bold">Admin</h1>}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xl focus:outline-none"
          >
            <FaBars />
          </button>
        </div>

        {/* Menu */}
        <ul className="mt-6 space-y-2">
          <SidebarItem icon={<FaHome />} text="Dashboard" isOpen={isOpen} />
          <SidebarItem icon={<FaBoxOpen />} text="Products" isOpen={isOpen} />
          <SidebarItem icon={<FaImage />} text="Gallery" isOpen={isOpen} />
          <SidebarItem icon={<FaUsers />} text="Users" isOpen={isOpen} />
          <SidebarItem icon={<FaCog />} text="Settings" isOpen={isOpen} />
        </ul>
      </div>

      {/* Main Content Placeholder */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-semibold">Main Content Area</h2>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, isOpen }) => {
  return (
    <li className="flex items-center gap-4 px-6 py-3 hover:bg-gray-800 cursor-pointer transition-all duration-200">
      <span className="text-lg">{icon}</span>
      {isOpen && <span className="text-md font-medium">{text}</span>}
    </li>
  );
};

export default Asider;