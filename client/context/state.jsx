"use client"

import { createContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'
import { fetchAllQuestions } from '@/hooks/useApi'


export const Context = createContext()

export const ContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([])
  const [previousQuestion, setPreviousQuestion] = useState()

  const fetchQuestions = () => {
    fetchAllQuestions()
      .then(response => setQuestions(response.questions))
      .catch(() => toast.error('Houve um problema para buscar as perguntas recentes.'))
  }

  const selectPreviousQuestion = (name) => {
    setPreviousQuestion(questions.find(item => item.question === name))
  }

  return (
    <Context.Provider value={{ questions, fetchQuestions, previousQuestion, selectPreviousQuestion }}>
      {children}
    </Context.Provider>
  )
}