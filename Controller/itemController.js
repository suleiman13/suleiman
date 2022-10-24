import asyncHandler from "express-async-handler";
import Item from "../Models/item.js";
import User from "../Models/user.js";
import user_router from "../Routes/userRoute.js";

export const create_item = asyncHandler(async(req,res) => {
    const user = await User.find(req.user.id)
    const {itemName, price, qty, size, typeOfItem, description} = req.body

    if(user){
        const item = await Item.create({
            created_by: req.user.id,
            itemName,
            price,
            size,
            typeOfItem,
            qty,
            availablity: true,
            description,
        })
        if(item){
            res.json({
                status: "ok",
                message: "item created succefully",
                data: item
            })
        }else{
            res.json({
                error: "invalid data inputed" 
            })
        }
    }
})

export const get_paginated_items = asyncHandler(async(req, res) => {
    const user =await User.findById(req.user.id)

    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const count = await Item.countDocuments({created_by: req.user._id}) 
    const item = await Item.find({created_by: user._id})
      .sort({createdAt: -1})
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      if(user && item){
        res.json({
            status: "ok",
            message: "paginated item retrieved",
            data: {
                item,
                meta: {
                    page,
                    pages: Math.ceil(count / pageSize),
                    total: count,
                }
            }
        })
      }else{
        res.json({
            error: "User does not exist or does not have item"
        })
      }
})

export const get_items = asyncHandler(async(req, res) => {
    const user = await user.findById(req.user.id)
    const item = await item.findOne({created_by: user._id})

    if(user && item){
        res.json({
            status: "ok",
            message: "all items retrieved",
            data: item
        })
    }else{
        res.json({
            error: "user does not exist or no item"
        })
    }
})