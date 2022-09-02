const mongoose = require('mongoose');

const category_Schema = new mongoose.Schema
    ({
        category_name: {
            type: String,
            required: true,
            unique: true,
        }
    })

const Category = mongoose.model('Category', category_Schema);
module.exports.Category = Category;