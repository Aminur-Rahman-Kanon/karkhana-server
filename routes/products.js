const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//models
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
    try {
        //fetching all products one by one
        const featured = await featuredModel.find({});
        const exclusive = await exclusiveModel.find({});
        const trending = await trendingModel.find({});
        const topseller = await topSellerModel.find({});
        const bracelet = await braceletModel.find({});
        const fingerring = await fingerRingModel.find({});
        const earring = await earRingModel.find({});
        const toering = await toeRingModel.find({});
        const necklace = await necklaceModel.find({});
        const nepali = await nepaliModel.find({});
        const other = await otherModel.find({});
        const combo = await comboModel.find({});
        const latest = await latestModel.find({});
        const blog = await blogModel.find({})
        
        //then wrapping all products in an array ans sending it to the client
        const product = {featured, exclusive, trending, topseller,
        bracelet, fingerring, earring, necklace, toering, nepali, other,
        combo, latest, blog};
    
        return res.json({ status: 'success', data: product });
        
    } catch (error) {
        //send status error if something went wrong
        return res.json({ status: 'error' })
    }
})

module.exports = router;