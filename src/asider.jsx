import React, { useState } from "react";
import { 
  SiClerk 
} from "react-icons/si";
import { 
  MdDashboard, 
  MdOutlineAnalytics, 
  MdSettings 
} from "react-icons/md";
import { 
  FaProjectDiagram 
} from "react-icons/fa";
import { 
  AiOutlineApi 
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Asider = () => {

  const [active, setActive] = useState("Dashboard");

  const menus = [
    { name: "Dashboard", icon: <MdDashboard size={20} />, route: "/dashboard" },
    { name: "Crud", icon: <FaProjectDiagram size={20} />, route: "/crud" },
    { name: "Image", icon: <MdOutlineAnalytics size={20} />, route: "/image" },
    { name: "API", icon: <AiOutlineApi size={20} /> },
    { name: "Settings", icon: <MdSettings size={20} /> },
  ];

  return (
    <div className="w-[260px] h-screen bg-[#0f172a] text-gray-300 flex flex-col shadow-xl">

      {/* Logo Section */}
      <div className="flex justify-items-center gap-3 p-5 border-b border-gray-700">
        <SiClerk className="text-blue-500 w-[28px] h-[28px]" />
        <p className="text-white font-bold text-[22px] tracking-wide">
          n8n_ai
        </p>
      </div>

      {/* Menu Section */}
      <div className="flex-1 overflow-y-auto space-y-2">

        {menus.map((menu, index) => (
          <NavLink to={menu.route} className="text-none">
            <div
              key={index}
              onClick={() => setActive(menu.name)}
              className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-ease-out duration-200
                ${active === menu.name 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "hover:bg-gray-700 hover:text-white"
                }`}
            >
              <p className="text-[30px]">
                {menu.icon}
              </p>
              <span className="text-[15px] font-medium">
                {menu.name}
              </span>
            </div>
          </NavLink>
        ))}

      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-xs text-gray-400 text-center">
        © 2026 n8n_ai
      </div>

    </div>
  );
};

export default Asider;
