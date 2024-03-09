import mongoose from "mongoose";
import 'dotenv/config'

const connectDB = async () => {
    if(process.env.CMDBPW)
    {
        let pw = encodeURIComponent(process.env.CMDBPW)
        try {
            await mongoose.connect(`mongodb+srv://corvo:${pw}@prg8.jvfkdbs.mongodb.net/?retryWrites=true&w=majority&appName=PRG8`)
            console.log('Connected to MongoDB cloud');
        } catch (error) {
            console.log('Error connecting to MongoDB:', error);
        }
    }else{
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.log('Error connecting to MongoDB:', error);
        }
    }

};

export { connectDB }