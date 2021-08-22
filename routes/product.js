const express = require("express");
const { product_Validation } = require("../validations/product");
const router = express.Router();

router.post('/add_product', async (req, res) => {
    const result = product_Validation(req.body)
    if (result.error != null) {
        return res.json
            ({
                success: false,
                message: (result.error.details[0].message)
            })
    }

})