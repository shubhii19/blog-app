import express from 'express';
import dotenv from 'dotenv';
import mongoose  from 'mongoose';
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const MONGOURI = process.env.MONGO_URI;


app.use(express.json())
// console.log(MONGOURI)
// DB connection

try {
    mongoose.connect(MONGOURI);
    console.log("Connected to DB")
} catch (error) {
    console.log(error)
}
// defining routes
app.use('/api/users',userRoutes)

app.listen(PORT, ()=>{
    console.log(`server is runnning on port ${PORT}`)
})