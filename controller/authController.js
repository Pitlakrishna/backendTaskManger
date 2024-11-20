import userModel from '../model/userModel.js';
import { hashPassward, comparePassword } from './../helpers/authHelper.js';
import JWT from "jsonwebtoken";

// Register

export const registerController = async (req, res) => {
    try {
        const { email, password } = req.body

        // validations
        if (!email) {
            return res.send({ message: "email is Required" })
        }
        if (!password) {
            return res.send({ message: "password is Required" })
        }

        //check User

        const existingUser = await userModel.findOne({ email })   // here key: value  are same so You can directly {email} instead of {email : email}
        //check existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User Already Exist So Please Login",
            })
        }

        //register user
        const hashedPasword = await hashPassward(password)
        const user = await new userModel({ email, password: hashedPasword }).save()
        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user   // above object variable
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

// POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //vaalidation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or passward"
            })
        }

        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not Found"
            })
        }

        // check password And Match compare
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid passward"
            })
        }

        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                email: user.email
            },
            token,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}


//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" })
        }

        // checking Email to change or reset Password
        const user = await userModel.findOne({ email })
        if (!user) {
            res.status(404).send({
                success: false,
                message: "Wrong Email Or Answer",
            });
        }
        const hashed = await hashPassward(newPassword)   // if incase after we are geting user only otherwise above condn is going follow
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Resst Successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Somthing Went Wrong",
            error
        })
    }
}

//test  controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes")
    } catch (error) {
        console.log(error)
        res.send({ error })
    }
}

