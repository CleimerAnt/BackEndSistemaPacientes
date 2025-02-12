import express, { json } from 'express'
import 'dotenv/config.js'
import UserRoutes from './Routes/UserRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use('/User', UserRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server up')
})