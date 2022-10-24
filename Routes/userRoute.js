import express from "express"
//import { user_signin, user_signup, get_all_user } from "../Controller/userControler.js"
import{
    user_signup,
    user_signin,
    get_all_user,
    get_single_user,
    delete_single_user,
    update_single_user
}from '../Controller/userControler.js'
import { userProtect } from "../Midlewares/auth_handler.js"
const user_router = express.Router()

user_router.route("/")
   .post(user_signup)
   .get(get_all_user)
user_router.post("/user-signin", user_signin)
user_router.route('/:id')
   .get(userProtect, get_single_user)
   .put(userProtect, update_single_user)
   .delete(userProtect, delete_single_user)

export default user_router