const express = require('express');
const router = express.Router();
const firebaseConfig = require('../firebase_config/firebaseConfig');
const firebase = require('firebase/app');
const { getStorage, ref, deleteObject } = require('firebase/storage');

firebase.initializeApp(firebaseConfig);

const storage = getStorage()

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

router.post('/', async (req, res) => {
    const { products } = await req.body;

    switch(products.category){
        case 'Featured':
            await featuredModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Bracelet':
            await braceletModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Combo':
            await comboModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Ear Ring':
            await earRingModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Exclusive':
            await exclusiveModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Finger Ring':
            await fingerRingModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Latest':
            await latestModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Necklace':
            await necklaceModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Nepali':
            await nepaliModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Other':
            await otherModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Toe Ring':
            await toeRingModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Top Seller':
            await topSellerModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;

        case 'Trending':
            await trendingModel.deleteOne({
                name: products.name
            }).then(result => {
                if (result.deletedCount === 0){
                    return res.json({ status: 'failed' });
                }
                else {
                    return res.json({ status: 'success' });
                }
            }).catch(err => res.json({ status: 'database error' }));

            products.img.forEach(async (el, idx) => {
                const imgRef = ref(storage, `products/${products.category.toLowerCase()}/${products.name.toLowerCase()}/${products.name.toLowerCase()}${idx+1}`);
                await deleteObject(imgRef).then(result => console.log(result)).catch(err => console.log(err));
            })
        break;
    }
})

module.exports = router;

