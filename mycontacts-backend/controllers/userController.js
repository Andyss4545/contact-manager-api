const asyncHandler = require('express-async-handler')
const bycrpt = require('bcrypt') // bcrypt to protect password
const User = require("../models/userModel")

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler( async (req, res) => {

     const {username, email, password} = req.body

     if(!username || !email || !password) {
           res.status(400) 
           // if there is no username , email, password throw error that all fields are mandtory
           throw new Error("All fields are mandatory")
     }

     // look find email if already exist in database
     const userAvailable = await User.findOne({email});

     if(userAvailable){
        res.status(400) 
        // if email already exist, throw a validation error
        throw new Error("User already register")
     }


     // create a Hash password - Hashed password will be stored to the database
     const hashedPassword = await bycrpt.hash(password, 10);
     console.log("Hashed Password", hashedPassword)

     // register the user if the fields have all been satisfied
       const user = await User.create({
            username: username,  
            email: email,
            password: hashedPassword
       })
     console.log(`User created ${user}`)

     // send only id and email to the user, do not send hashedpassword
     if(user) {
          res.status(201).json({_id: user.id, email: user.email})
          // 201 means the resource is created
     } else{
           // if there is an error throw error
            res.status(400) 
            throw new Error("User data is not valid")
     }
})

//@desc Login a user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler( async (req, res) => {
    res.status(200).json({message: "Login the user"})
})

//@desc Current user info
//@route POST /api/users/current
//@access private 

const currentUser = asyncHandler( async (req, res) => {
    res.json({message: "The current user information"})
})




module.exports = {
    registerUser, 
    loginUser,
    currentUser
}