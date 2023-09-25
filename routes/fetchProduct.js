const express = require('express');
const router = express.Router({ mergeParams: true });
const featuredModel = require('../Schemas/schema').featuredModel;
const exclusiveModel = require('../Schemas/schema').exclusiveModel;
const trendingModel = require('../Schemas/schema').trendingModel;
const topSellerModel = require('../Schemas/schema').topSellerModel;
const braceletModel = require('../Schemas/schema').braceletModel;
const fingerRingModel = require('../Schemas/schema').fingerRingsModel;
const earRingModel = require('../Schemas/schema').earRingsModel;
const necklaceModel = require('../Schemas/schema').necklaceModel;
const toeRingModel = require('../Schemas/schema').toeRingsModel;
const nepaliModel = require('../Schemas/schema').nepaliModel;
const otherModel = require('../Schemas/schema').othersModel;
const latestModel = require('../Schemas/schema').latestModel;
const comboModel = require('../Schemas/schema').comboModel;
const blogModel = require('../Schemas/schema').blogModel;

router.get('/', async (req, res) => {
    const { category } = req.params;

    switch (category) {
        case 'initial-products':
            try {
                const featured = await featuredModel.find({}).lean();
                const exclusive = await exclusiveModel.find({}).lean();
                const trending = await trendingModel.find({}).lean();
                const topSeller = await topSellerModel.find({}).lean();
    
                const product = {featured, exclusive, trending, topSeller};
                return res.status(200).json({ data: product });
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        case 'featured':
            try {
                const product = await featuredModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        case 'exclusive':
            try {
                const product = await exclusiveModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        case 'trending':
            try {
                const product = await trendingModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }
        
        case 'topseller':
            try {
                const product = await topSellerModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        case 'bracelet':
            try {
                const product = await braceletModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        case 'finger-ring':
            try {
                const product = await fingerRingModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }
        
        case 'ear-ring':
            try {
                const product = await earRingModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }
        
        case 'toe-ring':
            try {
                const product = await toeRingModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }
        
        case 'necklace':
            try {
                const product = await necklaceModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        case 'nepali':
            try {
                const product = await nepaliModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        case 'other':
            try {
                const product = await otherModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        case 'combo':
            try {
                const product = await comboModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        case 'latest':
            try {
                const product = await latestModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        case 'blog':
            try {
                const product = await blogModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        default:
            return res.status(400).json({ status: 'invalid request' });
    }
})

module.exports = router;
