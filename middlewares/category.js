const { Category } = require("../models/category")

async function check_category(req, res, next) {
    try {
        const get_category = await Category.findOne({ _id: req.params.category_id })
        if (get_category == null)
            return res.json
                ({
                    success: false,
                    error: "category doest exist",
                })
        if (get_category)
            req.category = get_category
        next()
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
}

async function add_category(req, res, next) {
    try {
        const get_category = await Category.findOne({ category_name: req.body.category_name })
        if (get_category != null)
            return res.json
                ({
                    success: false,
                    error: "category already added ",
                })
        if (get_category == null)
            next()
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
}

module.exports.check_category = check_category
module.exports.add_category = add_category

