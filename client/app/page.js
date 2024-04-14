"use client"
import { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast'
import CopyIcon from "../components/icons/CopyIcon";
import { generateSql } from "@/hooks/useApi";
import LoadIcon from "../components/icons/LoadIcon";
import { Context } from "@/context/state";

export default function Home() {
  const [question, setQuestion] = useState()
  const [sql, setSql] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { fetchQuestions, previousQuestion } = useContext(Context)

  const formatSql = (sql => sql.replace('```sql\n', '').replace('\n```', ''))
  useEffect(() => {
    if (previousQuestion) {
      setSql(formatSql(previousQuestion.content))
      setQuestion(previousQuestion.question)
    }
  }, [previousQuestion])

  const submitGenererateSql = () => {
    setIsLoading(true)
    generateSql({ question })
      .then(response => {
        setSql(formatSql(response.result))
        toast.success('SQL gerado!', {
          icon: '🚀'
        })
        fetchQuestions()
      }).catch(() => {
        toast.error('Ocorreu um erro! Tente novamente em alguns minutos', {
          icon: '❌'
        })
      }).finally(() => setIsLoading(false))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sql)
    toast.success('SQL copiado!')
  }

  return (
    <main className="flex flex-col gap-5">
      <h1 className="text-white text-2xl font-bold">Gerar SQL</h1>
      <div className="flex flex-col gap-3">
        <label className="text-gray-300 text-sm font-light">Digite aqui sua pergunta:</label>
        <textarea
          type="text"
          className="rounded-md p-3 bg-gray-800 border-solid border-2 border-gray-500 text-white"
          placeholder="Quais são os produtos mais populares entre os clientes corporativos?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <button
        className={`flex flex-row gap-2 justify-center rounded-md bg-blue-500 p-2 text-white font-bold ${isLoading ? 'opacity-50' : undefined}`}
        onClick={submitGenererateSql}
        disabled={isLoading}
      >
        <LoadIcon className={isLoading ? 'w-6 h-6 animate-spin' : undefined} />
        Gerar SQL
      </button>
      <textarea type="text" className="rounded-md p-3 min-h-[300px] bg-gray-800 border-solid border-2 border-gray-500 text-white" placeholder="SELECT * FROM users WHERE name = 'John'" value={sql}/>
      <div className="flex">
        <button className="flex flex-row gap-2 justify-center rounded-md bg-blue-500 text-white font-bold p-2 w-[100px]" onClick={copyToClipboard}>
          <CopyIcon />
          Copiar
        </button>
      </div>
    </main>
  );
}
