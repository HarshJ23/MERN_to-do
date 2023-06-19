// import { User } from "../models/user";
import jwt from "jsonwebtoken"; 
import {User} from "../models/user.js";




// if user is authenticated, token exists. so check the isAuth  condition with help of whether the token exists or not
export const isAuthenticated =  async (req, res, next)=>{
    const {token} = req.cookies;
    console.log(token);
    
    if(!token){  
      return res.status(404).json({
        success : false,
        message : "Please login first",
      });
    };
    
    // const id = "jnkndf";
    
    const decoded = jwt.verify(token , process.env.JWT_TOKEN);
    
    
    req.user = await User.findById(decoded._id);
    next();
};