const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51NPRurHZovVrLdmol5RwOyXYdKE6q1yGCess7IoYgkCx4QMx0zqeFkUakyT4ELflaXMGp2a0UhZ8Ny0AUXrwXm4800HaxGR1T8');

router.post('/', async (req, res) => {

    const submitDetails = req.body;
    
    try {
        const payment = await stripe.paymentIntents.create({
            amount: submitDetails.total,
            currency: "GBP",
            description: 'test',
            payment_method: submitDetails.id,
            confirm: true
        })

        res.json({
            status: 'payment success'
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: 'payment failed',
        })
    }
})

module.exports = router;