import {User} from "../models/user.js";

import bcrypt from "bcrypt"; 
import { sendCookie } from "../utils/feature.js";
import jwt from "jsonwebtoken"; 



// API to get all users.(GET)
// export const getAllUser = async (req,res)=>{};


// API to create new user 
export const register = async (req,res)=>{
  const {name , email , password} = req.body;
  let user = await User.findOne({email});

  if(user) return next(new ErrorHandler("User already exists" , 400)); 

const hashedPassword = await bcrypt.hash(password, 10);

user = await User.create({name , email , password : hashedPassword,});

  sendCookie(user , res ,"Registered", 201);
};



export const login = async(req,res)=>{

  const {email , password} = req.body ;
  let user = await User.findOne({email}).select("+password");

  // user.password = hashedPassword
  // password = req.body.password 
  if(!user) return next(new ErrorHandler("user not found" , 400)); 


    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch)
      return  res.status(404).json({
        success : false,
        message: "invalid",
      });

      sendCookie(user, res , `Welcome ${user.name}` , 201  );
  };



  export const logout = async(req,res)=>{

  
    // user.password = hashedPassword
    // password = req.body.password 
  
    res.status(200).cookie("token" , "" , {
      expires: new Date (Date.now()) ,
      sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure :process.env.NODE_ENV === "Development" ? false : true,
  })
.json({
      success : true , 
      message : "Signed out of app"
    }); 
  
  };
  



export const getMyProfile = async (req,res)=>{

  // const id = "jndkfj";
  // const {id} = req.body;

res.status(200).json({
    success : true ,
    // message:"Wroking my profile",
    user : req.user,
  })
};






// export const updateDetails = async (req,res)=>{
//     // if using dynamic routes , use params and if using query(postman) , use req.query
//     const {id} = req.params;
//   const user = await User.findById(id);
//   console.log(req.params);
//   res.json({
//     success:true ,
//     message:"Updated",
//   });

// };

// export const deleteDetails = async (req,res)=>{
//     // if using dynamic routes , use params and if using query(postman) , use req.query
//     const {id} = req.params;
//   const user = await User.findById(id);
//   console.log(req.params);
//   res.json({
//     success:true ,
//     message:"User deleted",
//   });

// };