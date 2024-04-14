require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const { generateSqlFromText, fetchLastPrompts } = require('./service')
const { authenticateToken } = require('./middlewares')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.post('/generate-sql', authenticateToken, async (req, res) => {
  try {
    const { question } = req.body
    if (!question) {
      return res.status(400).send({ error: '"question" is a required field' })
    }
    const sql = await generateSqlFromText(question)
  return res.send({ result: sql })
  } catch (error) {
    return res.status(500).send({ error: 'Something went wrong. Check the logs to see more details' })
  }
})

app.get('/questions', authenticateToken, async (req, res) => {
  try {
    const questions =  await fetchLastPrompts()
    return res.send({ questions })
  } catch (error) {
    console.log(error.message)
    return res.status(500).send({ error: 'Something went wrong. Check the logs to see more details' })
  }
})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})