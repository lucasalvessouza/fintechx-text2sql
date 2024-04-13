require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { generateSqlFromText } = require('./service')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/generate-sql', async (req, res) => {
  const { question } = req.body
  if (!question) {
    return res.status(400).send({ error: '"question" is a required field' })
  }
  const sql = await generateSqlFromText(question)
  return res.send({ result: sql })
})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})