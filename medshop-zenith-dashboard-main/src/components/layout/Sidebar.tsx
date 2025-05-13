
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, Package, BarChart2, X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Sales", path: "/sales", icon: <ShoppingCart size={20} /> },
    { name: "Inventory", path: "/inventory", icon: <Package size={20} /> },
    { name: "Reports", path: "/reports", icon: <BarChart2 size={20} /> },
  ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-30 lg:z-auto lg:translate-x-0 w-64",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-medblue">MedShop</span>
            <span className="font-semibold text-gray-700">Zenith</span>
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-3 rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-medblue text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
