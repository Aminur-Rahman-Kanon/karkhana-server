const express = require('express');
const router = express.Router();
const userModel = require('../Schemas/schema').registerModel;

router.post('/', async (req, res) => {
    const products = req.body.products;
    const user = req.body.userObj;

    if (!Object.keys(user).length) return res.json({ status: 'user not found' });

    const dateToday = new Date();

    const estDeliveryDate = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate() + 7);

    const orderDetails = {
        orderDetails: {
            orderId: Math.floor(Math.random() * 1000000000),
            orderDate: new Date().toDateString(),
            estDeliveryDate: estDeliveryDate.toDateString(),
            payment: 'verified'
        },
        address: {
            city: user.state,
            street: user.address,
            thana: user.thana,
            zipcode: user.zipcode
        },
        products: products,
    }

    await userModel.updateOne({
        email: user.email
    }, 
    {
        $set: {
            purchased: orderDetails
        }
    }).then(async result => {
        await userModel.find({ email: user.email })
        .then(data => res.json({ status: 'success', data: data[0] }))
        .catch(err => res.json({ status: 'failed' }));
    }).catch(err => res.json({ status: 'failed' }));
})

module.exports = router;
