import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import UserRoutes from './Routes/UserRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();
const corsOptions = {
    origin:'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/User', UserRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server up')
})