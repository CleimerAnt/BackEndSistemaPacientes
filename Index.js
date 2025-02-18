import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import UserRoutes from './Routes/UserRoutes.js'
import PatientRoutes from './Routes/PatientsRoutes.js'
import DoctorRoutes from './Routes/DoctorRoutes.js'
import MedicalAppointmentsRoutes from './Routes/MedicalAppointmentsRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Algo salió mal en el servidor' });
});

const corsOptions = {
    origin:'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/Patient', PatientRoutes)
app.use('/User', UserRoutes)
app.use('/MedicalAppointments', MedicalAppointmentsRoutes)
app.use('/Doctor', DoctorRoutes)

app.listen(process.env.PORT, () => {
    console.log('Server up')
})