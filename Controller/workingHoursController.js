import asyncHandler from "express-async-handler";
import workDays from "../Models/working-hours.js";
import User from "../Models/user.js";
// import workDays from "../Models/working-hours.js";


export const created_workDay = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const workingDays = await workDays.findOne({created_by: req.user.id})
    const {day, openingHour, closingHour} = req.body

    const workExists = await workDays.findOne({created_by: req.user.id, "workDays.day": day})
    if(workExists){
        res.json({
            message : "work day already exists with time"
        })
    }else {
        if(user && workingDays){
            if(workingDays.workDays.length > 7){
                res.json({
                    error: "workdays cannot exceed seven days"
                })
            }
            const updateWork = await workDays.findByIdAndUpdate(workingDays._id, {
                $addToSet : {
                    workDays: [
                        {
                            day,
                            openingHour,
                            closingHour
                        }
                    ]
                }
            }, ({new: true, useAndModify: false}))
    
            if(updateWork){
                res.json({
                    status: "ok",
                    message: "workdays have been updated",
                    data: workingDays
                })
            }
        }else{
            const newwork = await workDays.create({
                created_by : req.user.id,
                workDays: [
                    {
                        day,
                        openingHour,
                        closingHour
                    }
                ]
            })
            if(newwork){
                res.json({
                    status: "ok",
                    message: "workday has been created successfully",
                    data: newwork
                })
            }else{
                res.json("invalide date provided")
            }
        }
    }

})

export const get_single_working_hour = asyncHandler(async(req, res) => {
    const user = await User.find(req.user.id)
    const workingDays = await workDays.findOne({created_by: req.user.id})
    console.log(workingDays.workDays.length)

    if(user && workingDays){
        let singleworkDay = workingDays.find(elem => elem._id)

        if(singleworkDay){
            res.json({
                status: "ok",
                message: "work day and time retreive"
            })
        }else{
            res.json({
                message: "work day and time does not exixt"
            })
        }
    }else{
        res.json({
            message: "this user has not create a work day"
        })
    }
})
export const update_single_working_hour = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const workDays = await workDays.findOne({created_by: req.user.id})
    const {day, openingHours, closingHours} = req.body
    console.log(workingDays.workDays.length)

    if(user && workingDays){
        const singleworkDay = workingDays.workDays.find(elem => elem._id)
        
        if(singleworkDay){
            singleworkDay.day = day || singleworkDay.day,
            singleworkDay.openingHours = openingHours || singleworkDay.openingHours,
            singleworkDay.closingHours = closingHours || singleworkDay.closingHours
        }
        const saveWorkDay = await singleworkDay.save()
        if(saveWorkDay){
            res.json({
                status: "ok",
                message:"work day and time updated successfully",
                data: saveWorkDay
            })
        }else{
            res.json({
                message: "this user does not have work day and time"
            })
        }
    }else{
        res.json({
            error: "working hours does not exist"
        })
    }
})

export const delete_single_working_hour = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const workingDays = await workDays.findOne({created_by: req.user.id})
    console.log(workingDays.workDays.length)
})