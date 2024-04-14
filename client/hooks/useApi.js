
const getHeaders = () => ({
  'Authorization': process.env.NEXT_PUBLIC_API_KEY,
  'Content-Type': 'application/json'
})

const generateSql = async (data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/generate-sql`,
    { 
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    }
  )

  return response.json()
}

const fetchAllQuestions = async (data) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/questions`,
    { 
      method: 'GET',
      headers: getHeaders()
    }
  )

  return response.json()
}

module.exports = {
  generateSql,
  fetchAllQuestions
}