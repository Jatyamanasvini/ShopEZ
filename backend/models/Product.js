const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    sizes: [{
        type: String
    }],

    stock: {
        type: Number,
        default: 0
    },

    material: {
        type: String
    },

    images: [{
        type: String
    }],

    featured: {
        type: Boolean,
        default: false
    },

    trending: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);