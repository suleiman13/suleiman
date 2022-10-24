import express from "express";
import { create_item, get_paginated_items, } from "../Controller/itemController.js";
import { userProtect } from "../Midlewares/auth_handler.js";

const item_router = express.Router()

item_router.route("/")
  .post(userProtect, create_item)
  .get(userProtect, get_paginated_items)
item_router.get("/paginated-items", userProtect, get_paginated_items)

export default item_router



