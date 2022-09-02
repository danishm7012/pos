const { Stock } = require("../models/stock")

async function check_stock(req, res, next) {
    try {
        const get_stock = await Stock.findOne({ _id: req.params.stock_id })
        if (get_stock == null)
            return res.json
                ({
                    success: false,
                    error: "Stock doest exist",
                })
        if (get_stock)
            req.stock = get_stock
        next()
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
}

async function add_stock(req, res, next) {
    try {
        const get_stock = await Stock.findOne({
            product_name: req.body.product_name,
            supplier_name: req.body.supplier_name,
            buy_price: req.body.buy_price,
        })
        if (get_stock != null)
            return res.json
                ({
                    success: false,
                    error: "Stock already added ",
                })
        if (get_stock == null)
            next()
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
}
module.exports.check_stock = check_stock
module.exports.add_stock = add_stock

