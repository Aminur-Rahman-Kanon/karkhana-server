const express = require('express');
const router = express.Router({ mergeParams: true });
const registerModel = require('../Schemas/schema').registerModel;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { id, token } = req.params;

    const {password, confirmPassword} = req.body;
    
    const userCheck = await registerModel.findOne({ _id: id });

    if (!userCheck) return res.json({ status: 'user not found' });

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verify);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await registerModel.updateOne({
            _id: id
        },
        {
            $set: {
                password: encryptedPassword
            }
        })
        res.render("success");
        
    } catch (error) {
        res.json({ status: 'something went wrong' })
    }
})

module.exports = router;
