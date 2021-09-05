const express = require("express");
const { check_invoice } = require("../middlewares/invoice");
const { Invoice } = require("../models/invoice");
const { invoice } = require("../models/invoice");
const { invoice_Validation } = require("../validations/invoice");
const router = express.Router();

router.post('/add', async (req, res) => {
    const result = invoice_Validation(req.body)
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }
    var added_products = req.body.products;
    if (added_products < 1) {
        return res.json
            ({
                success: false,
                message: "Add atleast 1 product"
            })
    }
    const new_invoice = new Invoice({
        customer_name: req.body.customer_name,
        date: req.body.date,
        products: added_products
    })

    console.log("before saving")
    const add_invoice = await new_invoice.save();
    console.log("after saving")

    return res.json
        ({
            success: true,
            message: "invoice added successfully",
            data: add_invoice,
        })
})

router.put('/update/:invoice_id', check_invoice, async (req, res) => {

    const result = invoice_Validation(req.body)
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }
    const get_invoice = await invoice.findOneAndUpdate(
        {
            _id: req.params.invoice_id
        },
        {
            product_name: req.body.product_name,
            supplier_name: req.body.supplier_name,
            buy_date: req.body.buy_date,
            product_per_carton: req.body.product_per_carton,
            quantity: req.body.quantity,
            buy_price: req.body.buy_price,
            sale_price: req.body.sale_price,
        },
        { new: true })
    //apply condionif supplier updated then fo followimg
    return res.json({
        success: true,
        message: "invoice Updated Successfully...",
        data: get_invoice
    })
    // }
    // catch (err) {
    //     res.json({
    //         success: false,
    //         message: err
    //     })
    //}
})

router.get("/get_all", async (req, res) => {
    try {
        const get_invoice = await Invoice.find({})
        if (get_invoice.length == 0)
            return res.json
                ({
                    success: false,
                    error: "No invoice in list",
                })
        if (get_invoice.length > 0)
            return res.json
                ({
                    success: true,
                    data: get_invoice
                })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})

router.get('/get/:invoice_id', check_invoice, async (req, res) => {
    try {
        return res.json
            ({
                success: true,
                data: req.invoice,
            })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})

router.delete('/delete/:invoice_id', check_invoice, async (req, res) => {
    try {
        const get_invoice = await invoice.findOneAndRemove({ _id: req.params.invoice_id },
            { new: true })
        return res.json
            ({
                success: true,
                error: "invoice deleted successfully",
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
        const get_invoice = await invoice.countDocuments({})
        if (get_invoice == 0)
            return res.json
                ({
                    success: false,
                    error: "No invoice in list",
                })
        if (get_invoice > 0)
            return res.json
                ({
                    success: true,
                    data: get_invoice
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
