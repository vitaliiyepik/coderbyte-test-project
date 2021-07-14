const { Schema, model } = require('mongoose');

const creditCardSchema = new Schema({
    nameOnCard: {
        type: String,
        required: true
    },
    cardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    expirationMonth: {
        type: Number,
        required: true
    },
    expirationYear: {
        type: Number,
        required: true
    },
    cvc: {
        type: Number,
        required: true
    }
}, { versionKey: false });

module.exports = model('CreditCard', creditCardSchema);