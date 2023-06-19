import {app} from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

// console.log(process.env.PORT);

app.listen(4000 , ()=>{
    console.log("server running at localhost:4000");
});