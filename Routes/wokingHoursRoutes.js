import express from "express"
import { userProtect } from '../Midlewares/auth_handler.js';
import { 
    created_workDay, 
    get_single_working_hour,
    update_single_working_hour,
    delete_single_working_hour
} from '../Controller/workingHoursController.js';

const work_router = express.Router()

// work_router.route("/working-days-hours")//
//     .post(userProtect, created_workDay)//
work_router.route("/working-days-hours/:id")
    .get(userProtect, get_single_working_hour)
    .patch(userProtect, update_single_working_hour)
    .delete(userProtect, delete_single_working_hour)

export default work_router
