const mongoose = require('mongoose');

const Payment_Schema = new mongoose.Schema
    ({
        from: {//customer or supplier
            type: String,
        },
        customer_name: {
            type: String,
        },
        supplier_name: {
            type: String,
        },
        details: {
            type: String,
        },
        paid_amount: {
            type: Number,
        },
        date: {
            type: Date,

        },
        remaing_balance: {
            type: Number
        }
    })

const Payment = mongoose.model('Payment', Payment_Schema);
module.exports.Payment = Payment;