import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {

  NODE_ENV :process.env.node_env,
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  jwt_access_secret:process.env.JWT_SECRET,
  jwt_access_expires_in:process.env.expires_in,
  bcrypt_salt_rounds:process.env.bcrypt_salt_rounds,
  jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in:process.env.refresh_expires_in


}
