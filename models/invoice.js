const mongoose = require('mongoose');

const invoice_Schema = new mongoose.Schema
    ({
        customer_name: {
            type: String,
            required: true,
            // unique: true,
        },
        date: {
            type: Date,
            required: true,
        },
        products: [{
            product_name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            sale_price: {
                type: Number,
                required: true,
            },
        }],
        grand_total: {
            type: Number,
            required: true
        },
        paid_amount: {
            type: Number,

        }
    })

const Invoice = mongoose.model('Invoice', invoice_Schema);
module.exports.Invoice = Invoice;