import express from "express" 
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

// import {connectDB} from "./data/database.js"
import {config} from 'dotenv';
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";


 export const app = express();

// const router = express.Router();

config({
    path :"./data/config.env",
});


// connectDB();

// using middleware
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
    credentials : true,
}));

// using routes. 
app.use( "/api/v1/users" , userRouter);

//accessing routes for tasks
app.use("/api/v1/tasks" , taskRouter);

// using error middleware 
app.use(errorMiddleware);

// mongoose.connect("mongodb://127.0.0.1:27017", {
//     dbName:"backendAPI",  
// }).then(()=>console.log("Database connected")).catch((e)=>console.log(e));


app.get("/" , (req,res)=>{
    res.send("nice working");
});




// 



// app.listen(4000 , ()=>{
//     console.log("server running at localhost:4000");
// });