const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogModels = require('../Schemas/schema').blogModel;
const firebase = require('firebase/app');
const firebaseConfig = require('../firebase_config/firebaseConfig');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage');

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

const upload = multer(multer.memoryStorage());

router.post('/', upload.single('photo'), async (req, res) => {
    const { data } = await req.body;
    const extractedData = await JSON.parse(data);

    // if photo uploaded
    if (req.file){
        const photo = req.file.buffer;
        const imgRef = ref(storage, `/products/blog/blog${extractedData.productIndex}.jpg`);
    
        const metaData = {
            contentType: req.file.mimetype
        }
    
        const snapshot = await uploadBytesResumable(imgRef, req.file.buffer, metaData);
        const url = await getDownloadURL(snapshot.ref);
    
        blogModels.updateOne({
            title: extractedData.index
        }, {
            $set: {
                title: extractedData.title,
                date: extractedData.date,
                details: extractedData.details,
                img: url
            }
        }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
    }
    //no photo uploaded
    else {
        console.log(extractedData.index);
        console.log(extractedData);
        blogModels.updateOne({
            _id: extractedData.index
        }, {
            $set: {
                title: extractedData.title,
                date: extractedData.date,
                details: extractedData.details,
            }
        }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
    }

})


module.exports = router;
