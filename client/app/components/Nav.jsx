"use client"
import { useState } from 'react'
import Image from "next/image";
import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className="flex h-screen">          
          {/* Sidebar */}
          <div className={`bg-gray-800 h-full text-white p-3 ${isSidebarOpen ? 'w-1/4' : 'w-[50px]'}`}>
              <div className={`flex justify-center ${isSidebarOpen ? 'md:justify-between' : 'justify-center'}`}>
                {
                  isSidebarOpen && 
                    <Image
                      src="/vercel.svg"
                      alt="Vercel Logo"
                      className="dark:invert hidden md:block"
                      width={100}
                      height={24}
                      priority
                    />
                }
                <button
                    className="rounded-full"
                    onClick={toggleSidebar}
                >
                   
                   {isSidebarOpen ? <ArrowLeft /> : <ArrowRight />}
                </button>
              </div>
              <div>

              </div>
          </div>
      </div>
  );
};

export default Nav;