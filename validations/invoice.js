const Joi = require('joi');
function invoice_Validation(invoice) {
    const invoice_Schema = Joi.object
        ({
            customer_name: Joi.string().required().min(1).max(120),
            date: Joi.string().required(),
            products: Joi.array().items(Joi.object
                ({
                    product_id: Joi.string().required(),
                    product_name: Joi.string().required(),
                    quantity: Joi.number().required(),
                    sale_price: Joi.number().required(),
                })),
            grand_total: Joi.number().required(),
            paid_amount: Joi.number().required(),

        })
    return result = invoice_Schema.validate(invoice);
}

module.exports.invoice_Validation = invoice_Validation;


