  import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utilities/generate_token.js"
import User from "../Models/user.js";


export const user_signup = asyncHandler(async(req,res) => {
 const {
    firstName, middleName, lastname, gender, age, address, password, phoneNumber, email
    } = req.body
     const userExist = await User.find({$or: [{email: email}, {phoneNumber: phoneNumber}]})

    if(userExist.length > 0){
        throw new Error("User already exists")
    }else{
        const hashedPass = await bcrypt.hash(password, 10)
         const user = await User.create({ 
            firstName, lastname, phoneNumber, age, password: hashedPass, email, gender, address
            })
        if(user){
            res.status(201).json({ 
                status: "ok",
                message: "User created successfully",
                data: {
                    _id: user._id,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    lastname: user.lastname,
                    age: user.age,
                    email: user.email,
                    address: user.address,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                    password: user.password,
                    token: generateToken(user._id)
                }
            })
        } else{
            res.status(400).json({
                message: "user data not valid"
            })
        }
    }
})
export const user_signin = asyncHandler(async(req, res) => {
   const{email, password} = req.body

   const user = await User.findOne({email})
   if(!user || !bcrypt.compareSync(password, user.password)){
       res.json({error: "Email or Password is incorrect"})
}else{
    res.json({
        status: "ok",
        message: "login successful",
        data: {
            _id: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastname: user.lastname,
                age: user.age,
                email: user.email,
                address: user.address,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                password: user.password,
                 token: generateToken(user._id)
            }   
        })
    }
})

export const get_all_user = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json({
        status: "ok",
        message: "All users retrieved",
        data: users

    })
})

export const get_single_user = asyncHandler(async(req, res)=> {
    const user = await User.findOne({_id: req.params.id})
    if(user){
        res.json({
            status: "ok",
            message: "user gotten",
            data: user
        })
    }
})

export const update_single_user = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    const{
        firstName,
        middleName,
        lastname,
        age,
        gender,
        email,
        password,
        phoneNumber,
        address} = req.body
    if(user){
        user.firstName = firstName || user.firstName
        user.middleName = middleName || user. middleName
        user.lastname = lastname || user.lastname
        user.age = age || user.age
        user.address = address || user.address
        user.phoneNumber = phoneNumber || user.phoneNumber
        user.gender = gender || user.gender
        user.email = email || user.email
    }

    const updatedUser = await user.save()

    if(updatedUser){
        res.status(201).json({
            status: 'ok',
            message:'user updated successfully',
            data: updatedUser
        })
    }else{
        res.json({error:'something went wrong'})
    }{
        res.json({error:'user does  not exixt'})
    }
})

export const delete_single_user = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        res.json({status:'ok',
    message: 'user delete successfully'})
    }else{
        res.json({message: 'User not found'})
    }
})
