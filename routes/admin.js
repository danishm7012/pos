const express = require('express');
const { Admin } = require('../models/admin');
const router = express.Router();
const { admin_Validation } = require("../validations/admin");
const Joi = require('joi');
router.post('/signup', async (req, res) => {
    const result = admin_Validation(req.body);
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
        return res.json
            ({
                success: false,
                message: "Email alreay registerd",
            })
    }
    try {
        const new_admin = new Admin
            ({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                type: req.body.type
            })
        const admin = await new_admin.save()
        return res.json
            ({
                success: true,
                message: "Account registered successfully",
                data: new_admin
            })
    }
    catch (err) {
        return res.json
            ({
                success: false,
                message: err.message,
            })
    }
})
router.post('/login', async (req, res) => {
    const result = logInValidation(req.body);
    if (result.error != null) {
        return res.json({
            success: false,
            status: 400,
            message: result.error.details[0].message
        })
    }
    try {
        var get_admin = await Admin.findOne({
            email: { $regex: "^" + req.body.email, $options: 'i' },
            password: req.body.password
        })

        if (!get_admin) {
            return res.json
                ({
                    success: false,
                    message: "user or password incorrect....",
                    status: 400
                })
        }

        if (get_admin) {
            return res.json
                ({
                    success: true,
                    data: get_admin
                })
        }

    }
    catch (err) {
        return res.json
            ({
                success: false,
                error: err,
            })
    }
})

router.get("/get_all", async (req, res) => {
    try {
        const get_Admin = await Admin.find({ type: "sub admin" })
        if (get_Admin.length == 0)
            return res.json
                ({
                    success: false,
                    error: "No admin in list",
                })
        if (get_Admin.length > 0)
            return res.json
                ({
                    success: true,
                    data: get_Admin
                })
    }
    catch (ex) {
        res.json({
            success: false,
            message: "Server error occur",
        })
    }
})


function logInValidation(vendor) {
    const vendor_schema = Joi.object
        ({
            email: Joi.string().email().required().min(3).max(120),
            password: Joi.string().required(),
        })
    return vendor_schema.validate(vendor)
}



module.exports = router;
