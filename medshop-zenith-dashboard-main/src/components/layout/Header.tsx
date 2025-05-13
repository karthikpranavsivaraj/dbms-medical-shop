
import React from "react";
import { Bell, Search, User, Menu } from "lucide-react";

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b shadow-sm px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu size={22} />
          </button>
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome to MedShop Zenith</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-medblue focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="h-8 w-8 rounded-full bg-medblue flex items-center justify-center text-white">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
