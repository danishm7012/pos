const { Product } = require("../models/product")

async function check_product(req, res, next) {
    try {
        const get_product = await Product.findOne({ _id: req.params.product_id })
        if (get_product == null)
            return res.json
                ({
                    success: false,
                    error: "product doest exist",
                })
        if (get_product)
            req.product = get_product
        next()
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
}

async function add_product(req, res, next) {
    try {
        const get_product = await Product.findOne({ product_name: req.body.product_name })
        if (get_product != null)
            return res.json
                ({
                    success: false,
                    error: "product already added ",
                })
        if (get_product == null)
            next()
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
}
module.exports.check_product = check_product
module.exports.add_product = add_product

