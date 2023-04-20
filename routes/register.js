const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const registerModel = require('../Schemas/schema').registerModel;

router.post('/', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const existUser = await registerModel.findOne({email});

    if (existUser) return res.json({ status: 'user exist' })

    const encryptedPass = await bcrypt.hash(password, 10);

    registerModel.create({
        firstName, lastName, email, phoneNumber, password:encryptedPass
    }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'error' }))
})

module.exports = router;
