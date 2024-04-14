"use client"
import { useEffect, useState } from 'react'
import Image from "next/image";
import { toast } from 'react-hot-toast'
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import { fetchAllQuestions } from '../../hooks/useApi'
import ArrowCircleIcon from './icons/ArrowCircleIcon';

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetchAllQuestions()
      .then(response => setQuestions([...response.questions].reverse()))
      .catch(() => toast.error('Houve um problema para buscar as perguntas recentes.'))
  }, [])

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`bg-gray-800 h-full text-white p-3 ${isSidebarOpen ? 'w-2/4' : 'w-[50px]'}`}>
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
              
              {isSidebarOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          </button>
        </div>

        <div className='flex flex-col gap-3 mt-[50px]'>
          <p className='text-sm text-gray-400 px-3'>Perguntas recentes</p>
          {questions.map(({ question }, index) => {
            return (
              <div key={index} className='flex flex-row justify-between hover:bg-gray-500 hover:rounded-md hover:cursor-pointer px-3 py-2 text-wrap'>
                <p className='text-white w-[90%]'>{question}</p>
                <button>
                  <ArrowCircleIcon />
                </button>
              </div>
            ) 
          })}
        </div>
    </div>
  );
};

export default Nav;