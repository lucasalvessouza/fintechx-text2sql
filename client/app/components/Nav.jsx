"use client"
import { useState } from 'react'
import Image from "next/image";

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className="flex h-screen">          
          {/* Sidebar */}
          <div className={`bg-gray-800 w-1/4 h-full text-white p-3 ${isSidebarOpen ? '' : 'hidden'}`}>
              <div className='flex justify-between'>
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  className="dark:invert"
                  width={100}
                  height={24}
                  priority
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end"
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
                </button>
              </div>
              <div>

              </div>
          </div>
      </div>
  );
};

export default Nav;