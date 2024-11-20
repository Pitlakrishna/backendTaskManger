import express from "express"
import { registerController, loginController, forgotPasswordController } from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//creating Routes for register

//router object 
const router = express.Router();

//routing

//REGISTER || METHOD POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

//test Routes
// router.get('/test', requireSignIn, isAdmin, testController)

//Forgot Password || post
router.post('/forgot-password', forgotPasswordController)

// protected user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

export default router;