const { customer, Customer } = require("../models/customer")

async function check_customer(req, res, next) {
    try {
        const get_customer = await Customer.findOne({ _id: req.params.customer_id })
        if (get_customer == null)
            return res.json
                ({
                    success: false,
                    error: "customer doest exist",
                })
        if (get_customer)
            req.customer = get_customer
        next()
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
}

async function add_customer(req, res, next) {
    try {
        const get_customer = await Customer.findOne({ customer_name: req.body.customer_name })
        if (get_customer != null)
            return res.json
                ({
                    success: false,
                    error: "customer already added ",
                })
        if (get_customer == null)
            next()
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
}
module.exports.check_customer = check_customer
module.exports.add_customer = add_customer

