import express from 'express';
import dotenv from  'dotenv';
import cors from 'cors'
import morgan from 'morgan'
import path from 'path';
import { errorHandler } from './Midlewares/Erro-handler.js';
import user_router from './Routes/userRoute.js';
import work_router from './Routes/wokingHoursRoutes.js';
import connectDB from "./Config/db.js"
import item_router from './Routes/itemRoute.js';

const app = express();

const __dirname = path.resolve()

dotenv.config({path: './config/config.env'});

connectDB().then()

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(errorHandler);
app.use('/api/user', user_router)
app.use("/api/user", work_router)
app.use("/api/item", item_router)

app.get("/home", (req, res) => {
    res.redirect("/api/docs")
})

const PORT = process.env.PORT || 5000;

app.listen,(
    PORT,
    console.log(
        `server running IN ${process.env.NODE_ENV} mode on port ${PORT}`
        )
)
