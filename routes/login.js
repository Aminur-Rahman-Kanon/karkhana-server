const express = require('express');
const router = express.Router();
const loginModel = require('../Schemas/schema').registerModel;
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    const {email, password} = req.body;
    const userQuery = await loginModel.findOne({ email });

    if (!userQuery) return res.json({ status: 'user not found' })

    const matchPassword = await bcrypt.compare(password, userQuery.password);

    if (!matchPassword) {
        return res.json({ status: "password doesn't match" })
    }
    else {
        return res.json({ status: 'success', user: userQuery });
    }
})

module.exports = router;