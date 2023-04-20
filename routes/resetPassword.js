const express = require('express');
const app = express();
const router = express.Router({ mergeParams: true });
const registerModel = require('../Schemas/schema').registerModel;
const jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
    const { id, token } = req.params;
    console.log(__dirname);
    
    const userCheck = await registerModel.findOne({ _id: id });
    if (!userCheck) return res.json({ status: 'user not found' });

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verify);
        res.render('index', {email: userCheck.email})
    } catch (error) {
        console.log(error);
        res.send("Link expired. Please try again")
    }
})

module.exports = router;