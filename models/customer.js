const mongoose = require('mongoose');

const customer_Schema = new mongoose.Schema
    ({
        customer_name: {
            type: String,
            required: true,
            unique: true,
        },
        contact_no: {
            type: Array,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        Customer_type: {
            type: String,
            //Define enum here
        }
    })

const Customer = mongoose.model('Customer', customer_Schema);
module.exports.Customer = Customer;