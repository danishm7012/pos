const Joi = require('joi');
function product_Validation(product) {
    const product_Schema = Joi.object
        ({
            barcode: Joi.string().required().min(1).max(120),
            product_name: Joi.string().required().min(1).max(120),
            details: Joi.string().required().min(1).max(120),
            category: Joi.string().required().min(1).max(120),
            product_per_carton: Joi.number().required().min(1).max(120),
            sale_price: Joi.number().required().min(1),
            supplier_price: Joi.number().required().min(1),
            supplier_name: Joi.string().required().min(1).max(120),
        })
    return result = product_Schema.validate(product);
}

module.exports.product_Validation = product_Validation;


