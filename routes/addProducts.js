const express = require('express');
const router = express.Router();
const featuredModel = require('../Schemas/schema').featuredModel;
const earRingModel = require('../Schemas/schema').earRingsModel;
const fingerRingModel = require('../Schemas/schema').fingerRingsModel;
const necklaceModel = require('../Schemas/schema').necklaceModel;
const braceletModel = require('../Schemas/schema').braceletModel;
const toeRingModel = require('../Schemas/schema').toeRingsModel;
const nepaliModel = require('../Schemas/schema').nepaliModel;
const comboModel = require('../Schemas/schema').comboModel;
const otherModel = require('../Schemas/schema').othersModel;
const exclusiveModel = require('../Schemas/schema').exclusiveModel;
const trendingModel = require('../Schemas/schema').trendingModel;
const topSellerModel = require('../Schemas/schema').topSellerModel;
const latestModel = require('../Schemas/schema').latestModel;
const blogModel = require('../Schemas/schema').blogModel;
const multer = require('multer');

const firebase = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');

const firebaseConfig = {
    apiKey: "AIzaSyBongj0o_QcFuEkJMfiqpT27Nyc-p7G7O4",
    authDomain: "karkhana-c685d.firebaseapp.com",
    projectId: "karkhana-c685d",
    storageBucket: "karkhana-c685d.appspot.com",
    messagingSenderId: "638258626182",
    appId: "1:638258626182:web:82f844b473ce1133e7db07",
    measurementId: "G-VW0WXX4VZB"
};

const upload = multer({ storage: multer.memoryStorage() })

firebase.initializeApp(firebaseConfig);

const storage = getStorage();

router.post('/', upload.array('photo'), async (req, res) => {
    const data = await JSON.parse(req.body.data);
    const productCategory = data.category.toLowerCase();
    const productName = data.name.toLowerCase();
    
    switch (productCategory) {
        case "featured":
            const featuredItem = await featuredModel.find({ name: data.name });
            if (featuredItem.length) return res.json({ status: 'product exist', product: featuredItem });

            if (!req.files.length) return res.json({ status: 'no img found' });
            const featuredImg = [];
            
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => featuredImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = featuredImg;

            await featuredModel.create(data).then(result => res.json({ status: `${data.name} success` })).catch(err => res.json({ status: 'failed' }));
            break;

        case "bracelet":
            //checking if product exist
            const braceletItem = braceletModel.find({ name: data.name });
            if ((await braceletItem).length) return res.json({ status: 'product exist', product: braceletItem });
            if (!req.files.length) return res.json({ status: 'no img found' });
            const braceletImg = [];
            
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => braceletImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = braceletImg;
            await braceletModel.create(data).then(result => res.json({ status: `${data.name} success` })).catch(err => res.json({ status: 'failed' }));
            break;

        case "combo":
            //checking if product exist
            const comboProduct = await comboModel.find({ name: data.name });
            if (comboProduct.length) return res.json({ status: 'product exist' ,  product: comboProduct });

            if (!req.files.length) return res.json({ status: 'no img found' });

            const comboImg = [];
            //create directory
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => comboImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = comboImg;

            await comboModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "ear ring":
            //checking if product exist
            const earRing = await earRingModel.find({ name: data.name });
            if (earRing.length) return res.json({ status: 'product exist' ,  product: earRing });

            const earRingImg = [];
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => earRingImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = earRingImg;
            
            await earRingModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "exclusive":
            //checking if product exist
            const exclusive = await exclusiveModel.find({ name: data.name });
            if (exclusive.length) return res.json({ status: 'product exist' ,  product: exclusive });

            const exclusiveImg = [];
            //create directory
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => exclusiveImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = exclusiveImg;

            await exclusiveModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "finger ring":
            //checking if product exist
            const fingerRing = await fingerRingModel.find({ name: data.name });
            if (fingerRing.length) return res.json({ status: 'product exist' ,  product: fingerRing });

            const fingerRingImg = [];
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => fingerRingImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = fingerRingImg;

            await fingerRingModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "latest":
            //checking if product exist
            const latest = await latestModel.find({ name: data.name });
            if (latest.length) return res.json({ status: 'product exist' ,  product: latest });

            const latestImg = [];
            //create directory
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => latestImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = latestImg;

            await latestModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "necklace":
            //checking if product exist
            const necklace = await necklaceModel.find({ name: data.name });
            if (necklace.length) return res.json({ status: 'product exist' ,  product: necklace });

            const necklaceImg = [];
            //create directory
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => necklaceImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = necklaceImg;

            await necklaceModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "nepali":
            //checking if product exist
            const nepali = await nepaliModel.find({ name: data.name });
            if (nepali.length) return res.json({ status: 'product exist' ,  product: nepali });

            const nepaliImg = [];
            //create directory
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => nepaliImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = nepaliImg;

            await nepaliModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "other":
            //checking if product exist
            const other = await otherModel.find({ name: data.name });
            if (other.length) return res.json({ status: 'product exist' ,  product: other });

            const otherImg = [];
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => otherImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = otherImg;
            
            await otherModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "toe ring":
            //checking if product exist
            const toeRing = await toeRingModel.find({ name: data.name });
            if (toeRing.length) return res.json({ status: 'product exist' ,  product: toeRing });

            const toeRingImg = [];
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => toeRingImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = toeRingImg;

            await toeRingModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "top seller":
            //checking if product exist
            const topSeller = await topSellerModel.find({ name: data.name });
            if (topSeller.length) return res.json({ status: 'product exist' ,  product: topSeller });

            const topSellerImg = [];
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => topSellerImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = topSellerImg;

            await topSellerModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "trending":
            //checking if product exist
            const trending = await trendingModel.find({ name: data.name });
            if (trending.length) return res.json({ status: 'product exist' ,  product: trending });

            const trendingImg = [];
            for(let i=0; i<req.files.length; i++) {
                const storageRef = ref(storage, `products/${productCategory}/${productName}/${productName}${i+1}`);
        
                const metaData = {
                    contentType: req.files[i].mimetype
                }
        
                const snapshot = await uploadBytesResumable(storageRef, req.files[i].buffer, metaData);
        
                await getDownloadURL(snapshot.ref).then(url => trendingImg.push(url)).catch(err => console.log(err));
            }
        
            //push database
            data['rating'] = 0;
            data['impression'] = 0;
            data['img'] = trendingImg;

            await trendingModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        default:
            return res.json({ status: 'invalid request' })
    }
})

module.exports = router;
