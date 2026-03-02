import { app } from "./app";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

connectDB()
.then(()=> {
    const PORT = process.env.PORT ?? 5000;
    app.listen(PORT, ()=>{
        console.log(`app running on port: ${PORT}`)
    })
})
.catch((error)=>{
    console.log(`ERR: ${error.message}`)
})

