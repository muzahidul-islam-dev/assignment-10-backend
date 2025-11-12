import express from 'express'
import { config } from 'dotenv'
import path from 'path'
import cors from 'cors'
import billRouter from './routes/routes.js'
import { connect } from './connection.js'
config({
    path: path.join(process.cwd(), '.env')
})
const port = process.env.PORT || 5001;
const app = express();
app.use(cors())
app.use(express.json())
app.use('/bill', billRouter)

connect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`)
    })
}).catch(error => {
    console.log('connection error')
})