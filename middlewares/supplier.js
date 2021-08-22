const { Supplier } = require("../models/supplier")

async function check_supplier(req, res, next) {
    try {
        const get_supplier = await Supplier.findOne({ _id: req.params.supplier_id })
        if (get_supplier == null)
            return res.json
                ({
                    success: false,
                    error: "Supplier doest exist",
                })
        if (get_supplier)
            req.supplier = get_supplier
        next()
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
}

async function add_supplier(req, res, next) {
    try {
        const get_supplier = await Supplier.findOne({ supplier_name: req.body.supplier_name })
        if (get_supplier != null)
            return res.json
                ({
                    success: false,
                    error: "Supplier already added ",
                })
        if (get_supplier == null)
            next()
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
}
module.exports.check_supplier = check_supplier
module.exports.add_supplier = add_supplier

