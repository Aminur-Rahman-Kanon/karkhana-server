const express = require('express');
const router = express.Router({ mergeParams: true });
const { featuredModel, exclusiveModel, trendingModel, topSellerModel, braceletModel, fingerRingsModel, earRingsModel,
        necklaceModel, toeRingsModel, nepaliModel, othersModel, latestModel, comboModel, blogModel  } = require('../Schemas/schema');

router.get('/', async (req, res) => {
    const { category } = req.params;

    console.log(category);

    switch (category) {
        case 'featured':
            try {
                const product = await featuredModel.find({}).lean();
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

        case 'top-seller':
            try {
                const product = await topSellerModel.find({}).lean();
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

        case 'bracelet':
            try {
                const product = await braceletModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }

        case 'finger-ring':
            try {
                const product = await fingerRingsModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }
        
        case 'ear-ring':
            try {
                const product = await earRingsModel.find({}).lean();
                return res.status(200).json({ data: product })
            } catch (error) {
                return res.status(400).json({ status: 'server error' })
            }
        
        case 'toe-ring':
            try {
                const product = await toeRingsModel.find({}).lean();
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
                const product = await othersModel.find({}).lean();
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
