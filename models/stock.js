const mongoose = require('mongoose');

const stock_Schema = new mongoose.Schema
    ({
        product_name: {
            type: String,
            required: true,
            unique: true,
        },
        supplier_name: {
            type: String,
            required: true,
        },
        buy_date: {
            type: Date,
            required: true,
        },
        product_per_carton: {
            type: Number,
            // required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        buy_price: {
            type: Number,
            required: true
        },
        sale_price: {
            type: Number,
            required: true
        },
        total_bill: {
            type: Number,
        },
        paid_amount: {
            type: Number,
        },
        payment_date: {
            type: Date,
        },
        details: {
            type: String,

        }

    })

const Stock = mongoose.model('Stock', stock_Schema);
module.exports.Stock = Stock;