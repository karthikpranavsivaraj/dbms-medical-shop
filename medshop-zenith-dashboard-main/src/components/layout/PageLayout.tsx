
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
