import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { BooksRoutes } from './app/modules/books/book.route'

dotenv.config()

const app = express()

// middeleware
app.use(cors())
app.use(express.json())

app.use('/api/v1/books', BooksRoutes);

export default app
