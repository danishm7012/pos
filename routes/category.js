const express = require("express");
const { add_category, check_category } = require("../middlewares/category");
const { Category } = require("../models/category");
const { category_Validation } = require("../validations/category");
const router = express.Router();

router.post('/add', add_category, async (req, res) => {

    const result = category_Validation(req.body)
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }
    const new_category = new Category({
        category_name: req.body.category_name,
    })
    const add_category = await new_category.save();
    //how to check validation add_category return ok result 
    return res.json({
        success: true,
        message: "category added Successfully...",
        data: add_category
    })
})

router.put('/update/:category_id', check_category, async (req, res) => {
    try {
        const result = category_Validation(req.body)
        if (result.error != null) {
            return res.json
                ({
                    success: false,
                    message: (result.error.details[0].message)
                })
        }
        const get_category = await Category.findOneAndUpdate(
            {
                _id: req.params.category_id
            },
            {
                category_name: req.body.category_name,
            },
            { new: true })
        //apply condionif category updated then fo followimg
        return res.json({
            success: true,
            message: "category Updated Successfully...",
            data: get_category
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err
        })
    }
})

router.get('/get_all', async (req, res) => {
    try {
        const get_category = await Category.find({})
        if (get_category.length == 0)
            return res.json
                ({
                    success: false,
                    error: "No category in list",
                })
        if (get_category.length > 0)
            return res.json
                ({
                    success: true,
                    data: get_category
                })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})

router.get('/get/:category_id', check_category, async (req, res) => {
    try {
        return res.json
            ({
                success: false,
                data: req.category,
            })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})

router.delete('/delete/:category_id', check_category, async (req, res) => {
    try {
        const get_category = await Category.findOneAndRemove({ _id: req.params.category_id },
            { new: true })
        return res.json
            ({
                success: false,
                error: "category deleted successfully",
            })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})

router.get('/total', async (req, res) => {
    try {
        const get_category = await Category.countDocuments({})
        if (get_category == 0)
            return res.json
                ({
                    success: false,
                    error: "No category in list",
                })
        if (get_category > 0)
            return res.json
                ({
                    success: true,
                    data: get_category
                })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})



module.exports = router;