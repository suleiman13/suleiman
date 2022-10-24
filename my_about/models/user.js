import mongoose from "mongoose";

const userSchema = mongoose.Schema(
   {
      firstname: {type: String},
      middlename: {type: String},
      lastname: {type: String},
      email: {type: String},
      password: {type: String},
      phonenuber: {type: String},
      age: {type: Number},

   }
);

const User = mongoose.Model("User", userSchema)
export default User