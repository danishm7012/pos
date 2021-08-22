const Joi = require('joi');
function supplier_Validation(supplier) {
    const supplier_Schema = Joi.object
        ({
            supplier_name: Joi.string().required().min(1).max(120),
            contact_no: Joi.array().required().min(1).max(120),
            address: Joi.string().required().min(1).max(120),
            //   owner_name: Joi.string().required().min(1).max(120),
        })
    return result = supplier_Schema.validate(supplier);
}



module.exports.supplier_Validation = supplier_Validation;


