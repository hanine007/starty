import express from 'express';
import  cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
mongoose.connect(process.env.MONGODB_URI)
.then( ()=>{
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});
app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`);
})
