import express, {Application} from "express";
import cors, {CorsOptions} from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware";

const app: Application = express();

const Origin = process.env.ORIGIN;

const corsOptions: CorsOptions = {
    origin: Origin ? [Origin, "http://localhost:5173"] : ["http://localhost:5173"],
    credentials:true,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}

app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.json({limit: "16kb"}))
app.use(cookieParser())

import userRoute from "./routes/user.routes"

app.use("/api/v1/users", userRoute);

// Error Handler middleware
app.use(errorHandler);
export {app}