const mongoose = require('mongoose');

const admin_Schema = new mongoose.Schema
    ({
        first_name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 120,
        },
        last_name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 120,
        },
        verification_code: {
            type: String,
        },
        email:
        {
            type: String,
            required: true,
            //   unique: true
        },
        password:
        {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 1040
        },
        type: {
            type: String,
            required: true,
            //define enum here [super admin,sub admin, sales man e.t.c]
        },
    })

const Admin = mongoose.model('Admin', admin_Schema);
module.exports.Admin = Admin;

