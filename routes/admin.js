const express = require('express');
const { Admin } = require('../models/admin');
const router = express.Router();
const { admin_Validation } = require("../validations/admin");

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
            })
        const admin = await new_admin.save()
        return res.json
            ({
                success: true,
                message: "Account registered successfully",
                data: admin
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