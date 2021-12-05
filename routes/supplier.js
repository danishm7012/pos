const express = require("express");
const { check_supplier, add_supplier } = require("../middlewares/supplier");
const { Payment } = require("../models/payments");
const { Supplier } = require("../models/supplier");
const { supplier_Validation } = require("../validations/supplier");
const router = express.Router();

router.post('/add', add_supplier, async (req, res) => {
    try {
        const result = supplier_Validation(req.body)
        if (result.error != null) {
            return res.json
                ({
                    success: false,
                    message: (result.error.details[0].message)
                })
        }
        const new_supplier = new Supplier({
            supplier_name: req.body.supplier_name,
            contact_no: req.body.contact_no,
            address: req.body.address,
            supplier_email: req.body.supplier_email,
            previous_balance: req.body.previous_balance
        })
        const add_supplier = await new_supplier.save();
        //how to check validation add_supplier return ok result 
        return res.json({
            success: true,
            message: "Supplier added Successfully...",
            data: add_supplier
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err
        })
    }
})



router.post('/add_payment', async (req, res) => {

    var supplier = await Supplier.findOne({ supplier_name: req.body.supplier_name })
    var find_supplier = await Supplier.findOneAndUpdate({
        supplier_name: req.body.supplier_name,
    },
        {
            previous_balance: supplier.previous_balance - req.body.paid_amount
        }, { new: true })
    const new_payment = new Payment({
        from: "supplier",
        supplier_name: req.body.supplier_name,
        details: req.body.details,
        paid_amount: req.body.paid_amount,
        date: req.body.date,
        // previous_balance: supplier.previous_balance
        remaing_balance: find_supplier.previous_balance
    })


    const add_payment = await new_payment.save();
    //how to check validation add_payment return ok result 
    return res.json({
        success: true,
        message: "payment added Successfully...",
        data: add_payment
    })
})


router.get('/get_all_payments', async (req, res) => {
    try {
        const get_payment = await Payment.find({ from: "supplier" })
        if (get_payment.length == 0)
            return res.json
                ({
                    success: false,
                    error: "No payment in list",
                })
        if (get_payment.length > 0)
            return res.json
                ({
                    success: true,
                    data: get_payment
                })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})

router.put('/update/:supplier_id', check_supplier, async (req, res) => {
    try {
        const result = supplier_Validation(req.body)
        if (result.error != null) {
            return res.json
                ({
                    success: false,
                    message: (result.error.details[0].message)
                })
        }
        const get_supplier = await Supplier.findOneAndUpdate(
            {
                _id: req.params.supplier_id
            },
            {
                supplier_name: req.body.supplier_name,
                contact_no: req.body.contact_no,
                supplier_email: req.body.supplier_email,
                address: req.body.address,
                previous_balance: req.body.previous_balance
            },
            { new: true })
        //apply condionif supplier updated then fo followimg
        return res.json({
            success: true,
            message: "Supplier Updated Successfully...",
            data: get_supplier
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
        const get_supplier = await Supplier.find({})
        if (get_supplier.length == 0)
            return res.json
                ({
                    success: false,
                    error: "No supplier in list",
                })
        if (get_supplier.length > 0)
            return res.json
                ({
                    success: true,
                    data: get_supplier
                })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})

router.get('/get/:supplier_id', check_supplier, async (req, res) => {
    try {
        return res.json
            ({
                success: false,
                data: req.supplier,
            })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})

router.delete('/delete/:supplier_id', check_supplier, async (req, res) => {
    try {
        const get_supplier = await Supplier.findOneAndRemove({ _id: req.params.supplier_id },
            { new: true })
        return res.json
            ({
                success: false,
                error: "Supplier deleted successfully",
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
        const get_supplier = await Supplier.countDocuments({})
        if (get_supplier == 0)
            return res.json
                ({
                    success: false,
                    error: "No supplier in list",
                })
        if (get_supplier > 0)
            return res.json
                ({
                    success: true,
                    data: get_supplier
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