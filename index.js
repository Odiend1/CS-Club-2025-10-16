const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const OpenAI = require('openai')
const dotenv = require('dotenv')
dotenv.config()

const client = new OpenAI({apikey: process.env['OPENAI_API_KEY']})

app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/chat', async (req, res) => {
  console.log(req.body)
  const userMessage = req.body.message
  if(!userMessage){
    return res.status(400).json({ error: "Please enter a message." })
  }

  try { 
    const gptReply = await client.responses.create({
      model: "gpt-5-nano",
      input: userMessage,
    });

    replyText = gptReply.output_text
    res.json({ reply: replyText })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})