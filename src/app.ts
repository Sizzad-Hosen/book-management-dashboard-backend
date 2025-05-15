import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// middeleware
app.use(cors())
app.use(express.json())

// app.use('/api/v1', routes);

export default app
