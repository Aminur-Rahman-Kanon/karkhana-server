const express = require('express');
const router = express.Router({ mergeParams: true });
const { featuredModel, exclusiveModel, trendingModel, topSellerModel, braceletModel, fingerRingsModel, earRingsModel,
        necklaceModel, toeRingsModel, nepaliModel, othersModel, latestModel, comboModel, blogModel  } = require('../Schemas/schema');

router.get('/', async (req, res) => {
    const { category } = req.params;

    switch (category) {
        case 'initial-products':
            try {
                const product = {};
                // const featured = await featuredModel.find({}).lean();
                // const exclusive = await exclusiveModel.find({}).lean();
                // const trending = await trendingModel.find({}).lean();
                // const topSeller = await topSellerModel.find({}).lean();
                return Promise.all([
                    featuredModel.find({}).lean(),
                    exclusiveModel.find({}).lean(),
                    trendingModel.find({}).lean(),
                    topSellerModel.find({}).lean()
                ]).then(data => {
                    product['featured'] = data[0];
                    product['exclusive'] = data[1];
                    product['trending'] = data[2];
                    product['topSeller'] = data[3];
                    return res.status(200).json({ data: product });
                })
    
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
