import mongoose from "mongoose";
const itemSchema = mongoose.Schema(
    {
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        itemName: {type: String},
        price: {type: Number},
        size: {type: String},
        typeofItem: {type: String},
        qty: {type: Number},
        availability:{
            type: Boolean,
            default: true
        },
        description: {type: String}
    },
    {
        timeStamp: true
    }
)

const Item = mongoose.model("Item",itemSchema)
export default Item