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

router.post('/', async (req, res) => {
    const { products, price, quantity, productDetails } = await req.body;

    switch(products.category) {
        case 'Bracelet':
            const checkBracelet = await braceletModel.find({ name: products.name });
            if (!checkBracelet.length) return res.json({ status: 'not found' })

            await braceletModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Combo':
            const checkCombo = await comboModel.find({ name: products.name });
            if (!checkCombo.length) return res.json({ status: 'not found' })

            await comboModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Ear Ring':
            const checkEarRing = await earRingModel.find({ name: products.name });
            if (!checkEarRing.length) return res.json({ status: 'not found' })

            await earrRingModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Exclusive':
            const checkExclusive = await exclusiveModel.find({ name: products.name });
            if (!checkExclusive.length) return res.json({ status: 'not found' })

            await exclusiveModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Featured':
            const checkFeatured = await featuredModel.find({ name: products.name });
            if (!checkFeatured.length) return res.json({ status: 'not found' })

            await featuredModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Finger Ring':
            const checkFingerRing = await fingerRingModel.find({ name: products.name });
            if (!checkFingerRing.length) return res.json({ status: 'not found' })

            await fingerRingModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Latest':
            const checkLatest = await latestModel.find({ name: products.name });
            if (!checkLatest.length) return res.json({ status: 'not found' })

            await latestModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Necklace':
            const checkNecklace = await necklaceModel.find({ name: products.name });
            if (!checkNecklace.length) return res.json({ status: 'not found' })

            await necklaceModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Nepali':
            const checkNepali = await nepaliModel.find({ name: products.name });
            if (!checkNepali.length) return res.json({ status: 'not found' })

            await nepaliModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Other':
            const checkOther = await otherModel.find({ name: products.name });
            if (!checkOther.length) return res.json({ status: 'not found' })

            await otherModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Toe Ring':
            const checkToeRing = await toeRingModel.find({ name: products.name });
            if (!checkToeRing.length) return res.json({ status: 'not found' })

            await toeRingModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Top Seller':
            const checkTopSeller = await topSellerModel.find({ name: products.name });
            if (!checkTopSeller.length) return res.json({ status: 'not found' })

            await topSellerModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case 'Trending':
            const checkTrending = await trendingModel.find({ name: products.name });
            if (!checkTrending.length) return res.json({ status: 'not found' })

            await trendingModel.updateOne({
                name: products.name
            }, {
                $set: {
                    price: price,
                    quantity: quantity,
                    details: productDetails
                }
            }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        default:
            return res.json({ status: 'invalid request' });
    }
})


module.exports = router;
