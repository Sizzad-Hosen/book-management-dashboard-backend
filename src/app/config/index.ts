import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  NODE_ENV :process.env.node_env,
  port: process.env.PORT,
  database_url: process.env.DB_URL,
}
