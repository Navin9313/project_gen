import React from "react";
import { Outlet } from 'react-router-dom';
import Asider from "./asider";

const DashboardLayout = () => {
    return (
        <div className="grid lg:grid-cols-[20%_auto] gap-2">
          {/* Sidebar */}
          <div className="bg-gray-900 h-screen">
            <Asider />
          </div>
    
          {/* Main Content */}
          <div className="">
            <Outlet />
          </div>
        </div>
      );
}

export default DashboardLayout;