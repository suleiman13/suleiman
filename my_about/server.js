import express from 'express';
import dotenv from  'dotenv';
import Cors from 'Cors'
import morgan from 'morgan'
import path from 'path';
import { errorHandler } from './Midlewares/Erro-handler.js';
import user_router from './Routes/userRoute.js';
import work_router from './Routes/wokingHoursRoutes.js';
import connectDB from "./Config/db.js"
import item_router from './Routes/itemRoute.js';
import { Server } from 'http'




dotenv.config({path: './config/config.env'});

connectDB().then()
const app = express();
app.use(morgan('dev'));
app.use(Cors());
app.use(express.json());
app.use(errorHandler);
app.use('/api/user', user_router)
app.use("/api/user", work_router)
app.use("/api/item", item_router)

const PORT = process.env.PORT || 5000;

app.listen,(
    PORT,
    console.log(
        `server running IN ${process.env.NODE_ENV}mode on port ${PORT}`
        )
)
