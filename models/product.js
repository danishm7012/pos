const mongoose = require('mongoose');

const product_Schema = new mongoose.Schema
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
        total_carton: {
            type: Number,
            required: true
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
        }
    })

const Product = mongoose.model('Product', product_Schema);
module.exports.Product = Product;