const express = require('express');
const router = express.Router();
const registerModel = require('../Schemas/schema').registerModel;
const bcrypt = require('bcrypt');
const multer = require('multer');
const firebase = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const firebaseConfig = require('../firebase_config/firebaseConfig');

const upload = multer({ storage: multer.memoryStorage() });

firebase.initializeApp(firebaseConfig);

const storage = getStorage();

router.post('/', upload.single('avatar') ,async (req, res) => {

    const userData = JSON.parse(req.body.data);
    const email = userData.email;

    //Not necessary but maybe
    if (!email) return res.json({ status: 'email not provided' });
    
    //storing img to the firebase storage and generating a link
    if (req.file) {
        const metaData = {
            contentType: req.file.mimetype
        }

        let imgLink = '';
        
        const storageRef = ref(storage, `users/${email}`);
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metaData);

        await getDownloadURL(snapshot.ref).then(link => imgLink = link).catch(err => console.log(err));

        // update the database with the img link
        await registerModel.collection.updateOne({
            email: email
        }, {
            $set: {
                imgLink: imgLink
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
