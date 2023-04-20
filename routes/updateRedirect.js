const express = require('express');
const router = express.Router();
const registerModel = require('../Schemas/schema').registerModel;

router.post('/', async (req, res) => {
    const {email} = req.body;
    const user = await registerModel.findOne({ email });

    if (!user) {
        return res.json({ status: 'error' });
    }
    
    return res.json({ status: 'success', user: user });
})

module.exports = router;
