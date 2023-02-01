import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import express from 'express'
import{appRouter} from './src/modules/index.router.js'
import { Admin } from './src/services/AddAdmin.js'
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
const port = process.env.PORT 
const app = express()


appRouter(app)
Admin()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))