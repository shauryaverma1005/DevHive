import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;

        if(!MONGODB_URI){
            throw new Error("MONGODB URL Missing in .env file")
        }

        const connectionInstance = await mongoose.connect(`${MONGODB_URI}`)
        console.log(`MONGODB connected successfully`)
        console.log(`MONGODB Connected at : ${connectionInstance.connection.host}`);
    } catch (error: unknown) {
        console.log("Error connecting Mongo DB")
        if(error instanceof Error){
            console.log(`ERROR: ${error.message}`)
        } else {
            console.log(`unknow error : ${error}`)
        }

        process.exit(1);
        //in case mongoDB connection fails the app will terminate
    }
}