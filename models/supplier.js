const mongoose = require('mongoose');

const supplier_Schema = new mongoose.Schema
    ({
        supplier_name: {
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
        owner_name: {
            type: String,
            //   required:true,
        }

    })

const Supplier = mongoose.model('Supplier', supplier_Schema);
module.exports.Supplier = Supplier;