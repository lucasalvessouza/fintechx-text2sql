"use client"
import { useContext, useEffect, useState } from 'react'
import Image from "next/image";
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import ArrowCircleIcon from './icons/ArrowCircleIcon';
import { Context } from '@/context/state';

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { fetchQuestions, questions, selectPreviousQuestion } = useContext(Context)

  useEffect(() => {
    fetchQuestions()
  }, [])

  function handleWindowSizeChange() {
    if (window.innerWidth <= 760 &&  isSidebarOpen) {
      setIsSidebarOpen(false)
    }
    if (window.innerWidth > 760 && !!isSidebarOpen) {
      setIsSidebarOpen(true)
    }
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`bg-gray-800 h-full text-white p-3 w-[50px] ${isSidebarOpen ? 'absolute w-full md:w-2/4 md:relative' : 'w-[50px]'}`}>
        <div className={`flex justify-center ${isSidebarOpen ? 'md:justify-between' : 'justify-center'}`}>
          {
            isSidebarOpen && 
              <div className='flex flex-row gap-2 items-center'>
                <Image
                  src="/logo.svg"
                  alt="Company Logo"
                  className="hidden md:block"
                  width={80}
                  height={14}
                  priority
                />
                <span className='text-white font-bold'>FinTechX</span>
              </div>
          }
          <button
              className="rounded-full"
              onClick={toggleSidebar}
          >
              
              {isSidebarOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          </button>
        </div>

        {
          isSidebarOpen &&
          <div className='flex flex-col gap-3 mt-[50px]'>
            <p className='text-sm text-gray-400 px-3'>Perguntas recentes</p>
            {questions.map(({ question }, index) => {
              return (
                <div key={index} className='flex flex-row justify-between hover:bg-gray-500 hover:rounded-md hover:cursor-pointer px-3 py-2 text-wrap' onClick={() => selectPreviousQuestion(question)}>
                  <p className='text-white w-[90%]'>{question}</p>
                  <button>
                    <ArrowCircleIcon />
                  </button>
                </div>
              ) 
            })}
          </div>
        }
    </div>
  );
};

export default Nav;