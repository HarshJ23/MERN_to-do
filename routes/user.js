import  express  from "express";
import { getMyProfile, register , login , logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// app.get getAllUsers, function/API logic written in controllers folder.
// router.get("/all" , getAllUsers);

// app.post request
router.post("/new" , register);

// login 
router.post("/login" , login );

// logout 
router.get("/logout" , logout );

// // send get request
// router.get("/userid/:id", getUserDetails);



// // send get request
// router.put("/userid/:id", updateDetails);

// // send get request
// router.delete("/userid/:id", deleteDetails);


// lines 11-21 and line 26 function the same.

router.get("/me", isAuthenticated ,getMyProfile);


export default router ;