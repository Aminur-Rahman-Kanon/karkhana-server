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
const fs = require('fs');

router.post('/', async (req, res) => {
    const data = await JSON.parse(req.body.data);
    const productCategory = data.category.toLowerCase();
    const productName = data.name.toLowerCase();

    switch (productCategory) {
        case "featured":
            //checking if product exist
            const featuredProduct = await featuredModel.find({ name: productName });
            if (featuredProduct.length) return res.json({ status: 'product exist' ,  product: featuredProduct });

            const featuredImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/featured/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/featured/${productName}/${item.toLowerCase()}.${ext}`);
                featuredImg.push(`https://karkhana-server.onrender.com/assets/products/featured/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = featuredImg;
            await featuredModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "bracelet":
            //checking if product exist
            const braceletProduct = await braceletModel.find({ name: productName });
            if (braceletProduct.length) return res.json({ status: 'product exist' ,  product: braceletProduct });

            const braceletImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/bracelets/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/bracelets/${productName}/${item.toLowerCase()}.${ext}`);
                braceletImg.push(`https://karkhana-server.onrender.com/assets/products/bracelets/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = braceletImg;
            await braceletModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "combo":
            //checking if product exist
            const comboProduct = await comboModel.find({ name: productName });
            if (comboProduct.length) return res.json({ status: 'product exist' ,  product: comboProduct });

            const comboImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/combo/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/combo/${productName}/${item.toLowerCase()}.${ext}`);
                comboImg.push(`https://karkhana-server.onrender.com/assets/products/combo/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = comboImg;
            await comboModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "ear ring":
            //checking if product exist
            const earRing = await earRingModel.find({ name: productName });
            if (earRing.length) return res.json({ status: 'product exist' ,  product: earRing });

            const earRingImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/ear rings/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/ear rings/${productName}/${item.toLowerCase()}.${ext}`);
                earRingImg.push(`https://karkhana-server.onrender.com/assets/products/ear rings/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = earRingImg;
            await earRingModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "exclusive":
            //checking if product exist
            const exclusive = await exclusiveModel.find({ name: productName });
            if (exclusive.length) return res.json({ status: 'product exist' ,  product: exclusive });

            const exclusiveImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/exclusive/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/exclusive/${productName}/${item.toLowerCase()}.${ext}`);
                exclusiveImg.push(`https://karkhana-server.onrender.com/assets/products/exclusive/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = exclusiveImg;
            await exclusiveModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "finger ring":
            //checking if product exist
            const fingerRing = await fingerRingModel.find({ name: productName });
            if (fingerRing.length) return res.json({ status: 'product exist' ,  product: fingerRing });

            const fingerRingImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/finger rings/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/finger rings/${productName}/${item.toLowerCase()}.${ext}`);
                fingerRingImg.push(`https://karkhana-server.onrender.com/assets/products/finger rings/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = fingerRingImg;
            await fingerRingModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "latest":
            //checking if product exist
            const latest = await latestModel.find({ name: productName });
            if (latest.length) return res.json({ status: 'product exist' ,  product: latest });

            const latestImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/latest/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/latest/${productName}/${item.toLowerCase()}.${ext}`);
                latestImg.push(`https://karkhana-server.onrender.com/assets/products/latest/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = latestImg;
            await latestModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "necklace":
            //checking if product exist
            const necklace = await necklaceModel.find({ name: productName });
            if (necklace.length) return res.json({ status: 'product exist' ,  product: necklace });

            const necklaceImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/necklace/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/necklace/${productName}/${item.toLowerCase()}.${ext}`);
                necklaceImg.push(`https://karkhana-server.onrender.com/assets/products/necklace/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = necklaceImg;
            await necklaceModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "nepali":
            //checking if product exist
            const nepali = await nepaliModel.find({ name: productName });
            if (nepali.length) return res.json({ status: 'product exist' ,  product: nepali });

            const nepaliImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/nepali/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/nepali/${productName}/${item.toLowerCase()}.${ext}`);
                nepaliImg.push(`https://karkhana-server.onrender.com/assets/products/nepali/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = nepaliImg;
            await nepaliModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "other":
            //checking if product exist
            const other = await otherModel.find({ name: productName });
            if (other.length) return res.json({ status: 'product exist' ,  product: other });

            const otherImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/others/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/others/${productName}/${item.toLowerCase()}.${ext}`);
                otherImg.push(`https://karkhana-server.onrender.com/assets/products/others/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = otherImg;
            await otherModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "toe ring":
            //checking if product exist
            const toeRing = await toeRingModel.find({ name: productName });
            if (toeRing.length) return res.json({ status: 'product exist' ,  product: toeRing });

            const toeRingImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/toe rings/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/toe rings/${productName}/${item.toLowerCase()}.${ext}`);
                toeRingImg.push(`https://karkhana-server.onrender.com/assets/products/toe rings/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = toeRingImg;
            await toeRingModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "top seller":
            //checking if product exist
            const topSeller = await topSellerModel.find({ name: productName });
            if (topSeller.length) return res.json({ status: 'product exist' ,  product: topSeller });

            const topSellerImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/top seller/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/topSeller/${productName}/${item.toLowerCase()}.${ext}`);
                topSellerImg.push(`https://karkhana-server.onrender.com/assets/products/topSeller/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = topSellerImg;
            await topSellerModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "trending":
            //checking if product exist
            const trending = await trendingModel.find({ name: productName });
            if (trending.length) return res.json({ status: 'product exist' ,  product: trending });

            const trendingImg = [];
            //create directory
            fs.mkdirSync(`public/assets/products/trending/${productName}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                const ext = req.files[item].name.split('.').at(-1);
                req.files[item].mv(`public/assets/products/trending/${productName}/${item.toLowerCase()}.${ext}`);
                trendingImg.push(`https://karkhana-server.onrender.com/assets/products/trending/${productName}/${item.toLowerCase()}.${ext}`)
            })

            //push database
            data['rating'] = 0
            data['img'] = trendingImg;
            await trendingModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        default:
            return res.json({ status: 'invalid request' })
    }
})

module.exports = router;
