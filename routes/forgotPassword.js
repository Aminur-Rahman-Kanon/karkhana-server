const express = require('express');
const router = express.Router();
const registerModel = require('../Schemas/schema').registerModel;
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');

router.post('/', async (req, res) => {
    const { email } = req.body;

    const userCheck = await registerModel.findOne({ email });
    if (!userCheck) return res.json({ status: 'user not found' })

    const token = jwt.sign({ id: userCheck._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    const link = `https://karkhana-server.onrender.com/reset-password/${userCheck._id}/${token}`;

    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'karkhanawebservice@gmail.com',
              pass: 'ivlqywmzjmhbjzeo'
            }
        });
        
        const mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Reseting the password',
        text: `Here is the link to reset your password. Please note that this link is valid for 5 minutes. After 5 minutes it will not work, then you have to try again.
        \n${link}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });

        return res.json({ status: 'success' })
        
    } catch (error) {
        return res.json({ status: 'failed' })
    }
})

module.exports = router;