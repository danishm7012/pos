const Joi = require('joi');
function customer_Validation(customer) {
    const customer_Schema = Joi.object
        ({
            customer_name: Joi.string().required().min(1).max(120),
            customer_email: Joi.string().required().min(1).max(120),
            contact_no: Joi.string().required().min(1).max(120),
            address: Joi.string().required().min(1).max(120),
            previous_balance: Joi.number().required(),
            //   Customer_type: Joi.string().required().min(1).max(120),
        })
    return result = customer_Schema.validate(customer);
}

module.exports.customer_Validation = customer_Validation;


