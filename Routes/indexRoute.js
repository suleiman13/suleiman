import express from "express";

const index_router = express.Router()

index_router.get("/api/docs", (req, res) => {
    res.render("index")
})