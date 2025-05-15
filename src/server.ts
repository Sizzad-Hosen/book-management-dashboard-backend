import { Server } from 'http'
import mongoose from 'mongoose'
import config from './app/config'
import app from './app'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    console.log('Databse connected successfully')

    server = app.listen(config.port, () => {
      console.log(
        `Example app listening on port http://localhost:${config.port}`,
      )
    })
  } catch (error) {
    console.error('Error connecting to the databse or start the server', error)
  }
}

main()
