const mongoose = require('mongoose');

const product_Schema = new mongoose.Schema
    ({
        barcode: {
            type: String,
            required: true,
            // unique: true,
        },
        product_name: {
            type: String,
            required: true,
            // unique: true,
        },
        details: {
            type: String,
        },
        quantity: {
            type: Number,
            required: true
        },
        category: {
            type: String
        },
        sale_price: {
            type: Date,
            required: true,
        },
        supplier_price: {
            type: String,
            required: true,
        },
        supplier_name: {
            type: String,
            required: true
        }
    })

const Product = mongoose.model('Product', product_Schema);
module.exports.Product = Product;
