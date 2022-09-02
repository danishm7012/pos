const mongoose = require('mongoose');

const customer_Schema = new mongoose.Schema
    ({
        customer_name: {
            type: String,
            required: true,
            unique: true,
        },
        customer_email: {
            type: String,

        },
        contact_no: {
            type: Number,
            required: true,
        },
        address: {
            type: String,

        },
        previous_balance: {
            type: Number,
        },
        Customer_type: {
            type: String,
            //Define enum here
        }
    })

const Customer = mongoose.model('Customer', customer_Schema);
module.exports.Customer = Customer;