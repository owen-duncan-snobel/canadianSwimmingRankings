import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import 'dotenv/config'
import v1 from './v1'
import ErrorHandler from './v1/middleware/error_handler'
import redisClient from './libs/redis/redis'
require('express-async-errors')

const PORT = process.env.PORT
const app = express()

app.use(cors())
app.options('*', cors())
app.use(helmet())

app.use('/api/v1', v1)

app.get('/', (req, res) => {
  return res.json({
    message: 'PONG'
  })
})

app.get('/health', async (req, res) => {
  return res.status(200).json({
    status: 'SUCCESS',
    message: 'The server is healthy!'
  })
})

app.use(ErrorHandler)

redisClient.connect()

app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`)
})