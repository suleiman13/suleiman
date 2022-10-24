import mongoose from "mongoose";

const userSchema = mongoose.Schema(
   {
      firstname:{type: String},
      middlename:{type: String},
      lastname:{type: String},
      age:{type:Number},
      gender:{type: String},
      phonnumber:{type: String},
      email:{type: String},
      address:{type: String},
      password:{type: String}
   }
);

const User = mongoose.model("User", userSchema)
export default User



// const User = mongoose.model("user", userSchema)
// export default User