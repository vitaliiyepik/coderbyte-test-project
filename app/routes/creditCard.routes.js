const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const CreditCard = require('../models/creditCard.model');

const router = Router();

router.get('', async (req, res) => {
    try {
        const creditCards = await CreditCard.find();
        res.status(200).json({ data: creditCards });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post(
    '',
    [
        check('nameOnCard', 'Name on card is required')
            .exists(),

        check('cardNumber', 'Card number is required')
            .exists()
            .bail()
            .isLength({ min: 16, max: 16 })
            .withMessage('Card number is not valid'),

        check('expirationMonth', 'Expiration month is required')
            .exists()
            .bail()
            .isInt({ min: 1, max: 12 })
            .withMessage('Expiration month is not valid'),

        check('expirationYear', 'Expiration year is required')
            .exists()
            .bail()
            .isInt({ min: 2021, max: 2050 })
            .withMessage('Expiration year is not valid'),

        check('cvc', 'CVC number is required')
            .exists()
            .bail()
            .isLength({ min: 3, max: 3 })
            .withMessage('CVC number is not valid')
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const requestBody = req.body;

            const creditCard = await CreditCard.findOne({ cardNumber: requestBody.cardNumber });

            if (creditCard) {
                return res.status(400).json({ message: "Credit card already exists" });
            }

            const newCreditCard = new CreditCard(requestBody);

            await newCreditCard.save();

            res.status(200).json({ data: newCreditCard })
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
);

module.exports = router;