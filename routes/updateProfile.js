const express = require('express');
const router = express.Router();
const fs = require('fs');
const registerModel = require('../Schemas/schema').registerModel;
const bcrypt = require('bcrypt');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`des ${file}`);
        cb(null, 'public/assets/users');
    },
    filename: (req, file, cb) => {
        console.log(req.body);
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024
} });

router.post('/', upload.single('avatar') ,async (req, res) => {

    const userData = JSON.parse(req.body.data);
    const email = userData.email;

    //Not necessary but maybe
    if (!email) return res.json({ status: 'email not provided' });
    
    //change filename
    if (req.file) {
        const fileNames = req.file.originalname;
        // const fileName = fileNames.split('.')[0]
        const fileExt = fileNames.split('.')[1]
        
        fs.rename(`public/assets/users/${fileNames}`, `public/assets/users/${email}.${fileExt}`, (err) => {
            if (err) return res,json({ status: 'file upload error' });
        })

        //update the database with the img link
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

        registerModel.collection.updateMany({
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
