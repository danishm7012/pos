const mongoose = require('mongoose');

const supplier_Schema = new mongoose.Schema
    ({
        supplier_name: {
            type: String,
            required: true,
            unique: true,
        },
        supplier_email: {
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
        owner_name: {
            type: String,
            //   required:true,
        }

    })

const Supplier = mongoose.model('Supplier', supplier_Schema);
module.exports.Supplier = Supplier;