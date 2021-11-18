const express = require("express");
const { check_customer, add_customer } = require("../middlewares/customer");
const { Customer } = require("../models/customer");
const { Payment } = require("../models/payments");
const { customer_Validation } = require("../validations/customer");
const router = express.Router();

router.post('/add', add_customer, async (req, res) => {

    const result = customer_Validation(req.body)
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }
    const new_customer = new Customer({
        customer_name: req.body.customer_name,
        contact_no: req.body.contact_no,
        address: req.body.address,
        customer_email: req.body.customer_email,
        previous_balance: req.body.previous_balance
    })
    const add_customer = await new_customer.save();
    //how to check validation add_customer return ok result 
    return res.json({
        success: true,
        message: "customer added Successfully...",
        data: add_customer
    })
})


router.post('/add_payment', async (req, res) => {

    var customer = await Customer.findOne({ customer_name: req.body.customer_name })
    var find_customer = await Customer.findOneAndUpdate({
        customer_name: req.body.customer_name,
    },
        {
            previous_balance: customer.previous_balance - req.body.paid_amount
        }, { new: true })
    const new_payment = new Payment({
        from: "customer",
        customer_name: req.body.customer_name,
        details: req.body.details,
        paid_amount: req.body.paid_amount,
        date: req.body.date,
        // previous_balance: customer.previous_balance
        remaing_balance: find_customer.previous_balance
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
        const get_payment = await Payment.find({ from: "customer" })
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
router.get('/get_all', async (req, res) => {
    try {
        const get_customer = await Customer.find({})
        if (get_customer.length == 0)
            return res.json
                ({
                    success: false,
                    error: "No customer in list",
                })
        if (get_customer.length > 0)
            return res.json
                ({
                    success: true,
                    data: get_customer
                })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})



router.put('/update/:customer_id', check_customer, async (req, res) => {
    try {
        const result = customer_Validation(req.body)
        if (result.error != null) {
            return res.json
                ({
                    success: false,
                    message: (result.error.details[0].message)
                })
        }
        const get_customer = await Customer.findOneAndUpdate(
            {
                _id: req.params.customer_id
            },
            {
                customer_name: req.body.customer_name,
                contact_no: req.body.contact_no,
                customer_email: req.body.customer_email,
                address: req.body.address,
            },
            { new: true })
        //apply condionif customer updated then fo followimg
        return res.json({
            success: true,
            message: "customer Updated Successfully...",
            data: get_customer
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
        const get_customer = await Customer.find({})
        if (get_customer.length == 0)
            return res.json
                ({
                    success: false,
                    error: "No customer in list",
                })
        if (get_customer.length > 0)
            return res.json
                ({
                    success: true,
                    data: get_customer
                })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})

router.get('/get/:customer_id', check_customer, async (req, res) => {
    try {
        return res.json
            ({
                success: false,
                data: req.customer,
            })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})

router.delete('/delete/:customer_id', check_customer, async (req, res) => {
    try {
        const get_customer = await Customer.findOneAndRemove({ _id: req.params.customer_id },
            { new: true })
        return res.json
            ({
                success: false,
                error: "customer deleted successfully",
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
        const get_customer = await Customer.countDocuments({})
        if (get_customer == 0)
            return res.json
                ({
                    success: false,
                    error: "No customer in list",
                })
        if (get_customer > 0)
            return res.json
                ({
                    success: true,
                    data: get_customer
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