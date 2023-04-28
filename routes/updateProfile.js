const express = require('express');
const router = express.Router();
const registerModel = require('../Schemas/schema').registerModel;
const bcrypt = require('bcrypt');

router.post('/' ,async (req, res) => {

    const userData = JSON.parse(req.body.data);
    const email = userData.email;

    //Not necessary but maybe
    if (!email) return res.json({ status: 'email not provided' });
    
    //change filename
    if (req.files) {        
        const { avatar } = req.files
        const ext = avatar.name.split('.')[1];
        if (/^avatar/.test(avatar.mimetype)) return res.json({ status: 'invalid file' });
        
        avatar.mv(`public/assets/users/${userData.email}.${ext}`)

        // update the database with the img link
        await registerModel.collection.updateOne({
            email: email
        }, {
            $set: {
                imgLink: userData.imgLink
            }
        }).then(result => console.log(result)).catch(err => console.log(err))
    }
    
    //update user information
    const user = await registerModel.findOne({ email });

    if (!user) return res.json({ status: 'email not found' })

    if (userData.newpassword){
        //update everything with password
        const passwordMatch = await bcrypt.compare(userData.currentpassword, user.password)
        
        if (!passwordMatch) return res.json({ status: 'invalid password' });

        const newPassword = await bcrypt.hash(userData.newpassword, 10);

        registerModel.collection.updateOne({
            email: email
        }, {
            $set: {
                firstName: userData.firstname,
                lastName: userData.lastname,
                phoneNumber: userData.phonenumber,
                password: newPassword,
                state: userData.state,
                city: userData.city,
                address: userData.address,
                zipcode: userData.zipcode,
                thana: userData.thana
            }
        }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'error' }));
    }
    else {
        //update everything except password
        registerModel.collection.updateMany({
            email: email
        }, {
            $set: {
                firstName: userData.firstname,
                lastName: userData.lastname,
                phoneNumber: userData.phonenumber,
                state: userData.state,
                city: userData.city,
                address: userData.address,
                zipcode: userData.zipcode,
                thana: userData.thana
            }
        }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'errpr' }))
    }
})

module.exports = router;
