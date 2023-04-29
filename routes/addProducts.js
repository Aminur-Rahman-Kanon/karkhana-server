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
    const productName = data.name

    switch (productCategory) {
        case "featured":
            //checking if product exist
            const featuredProduct = await featuredModel.find({ name: productName });
            if (featuredProduct.length) return res.json({ status: 'product exist' ,  product: featuredProduct });

            const featuredImg = [];
            //create directory
            const featuredDirectory = fs.existsSync(`public/assets/products/featured/${productName.toLowerCase()}`);
            if (featuredDirectory) {
                return res.json({ status: 'product exist' });
            }

            fs.mkdirSync(`public/assets/products/featured/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                req.files[item].mv(`public/assets/products/featured/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                featuredImg.push(`https://karkhana-server.onrender.com/assets/products/featured/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`)
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
            const braceletDirectory = fs.existsSync(`public/assets/products/bracelets/${productName.toLowerCase()}`);
            if (braceletDirectory){
                return res.json({ status: 'product exist' })
            }

            fs.mkdirSync(`public/assets/products/bracelets/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                req.files[item].mv(`public/assets/products/bracelets/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                braceletImg.push(`https://karkhana-server.onrender.com/assets/products/bracelets/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`)
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
            const comboDirectory = fs.existsSync(`public/assets/products/combo/${productName.toLowerCase()}`);
            if (comboDirectory) {
                return res.json({ status: 'product exist' });
            }
            fs.mkdirSync(`public/assets/products/combo/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {    
                req.files[item].mv(`public/assets/products/combo/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                comboImg.push(`https://karkhana-server.onrender.com/assets/products/combo/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`)
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
            const earRingDirectory = fs.existsSync(`public/assets/products/ear rings/${productName.toLowerCase()}`);
            if (earRingDirectory){
                return res.json({ status: 'product exist' });
            }
            fs.mkdirSync(`public/assets/products/ear rings/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                req.files[item].mv(`public/assets/products/ear rings/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                earRingImg.push(`https://karkhana-server.onrender.com/assets/products/ear rings/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`)
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
            const exclusiveDirectory = fs.existsSync(`public/assets/products/exclusive/${productName.toLowerCase()}`);
            if (exclusiveDirectory) {
                return res.json({ status: 'product exist' });
            }
            fs.mkdirSync(`public/assets/products/exclusive/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                req.files[item].mv(`public/assets/products/exclusive/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                exclusiveImg.push(`https://karkhana-server.onrender.com/assets/products/exclusive/${productName}/${item.toLowerCase()}.jpg`)
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
            const fingerRingDirectory = fs.existsSync(`public/assets/products/finger rings/${productName.toLowerCase()}`);
            if (fingerRingDirectory){
                return res.json({ status: 'product exist' });
            }
            fs.mkdirSync(`public/assets/products/finger rings/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(async item => {
                req.files[item].mv(`public/assets/products/finger rings/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                fingerRingImg.push(`https://karkhana-server.onrender.com/assets/products/finger rings/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`)
            })

            //push database
            data['rating'] = 0
            data['img'] = fingerRingImg;
            await fingerRingModel.create(data).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'failed' }));
            break;

        case "latest":
            console.log('latest');
            //checking if product exist
            const latest = await latestModel.find({ name: productName });
            if (latest.length) return res.json({ status: 'product exist' ,  product: latest });

            const latestImg = [];
            //create directory
            const latestDirectory = fs.existsSync(`public/assets/products/latest/${productName.toLowerCase()}`);
            if (latestDirectory){
                return res.json({ status: 'product exist' });
            }
            fs.mkdirSync(`public/assets/products/latest/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                req.files[item].mv(`public/assets/products/latest/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                latestImg.push(`https://karkhana-server.onrender.com/assets/products/latest/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`)
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
            const necklaceDirectory = fs.existsSync(`public/assets/products/necklace/${productName.toLowerCase()}`);
            fs.mkdirSync(`public/assets/products/necklace/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                
                req.files[item].mv(`public/assets/products/necklace/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                necklaceImg.push(`https://karkhana-server.onrender.com/assets/products/necklace/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`)
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
            const nepaliDirectory = fs.existsSync(`public/assets/products/nepali/${productName.toLowerCase()}`);
            if (nepaliDirectory){
                return res.json({ status: 'product exist' })
            }
            fs.mkdirSync(`public/assets/products/nepali/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                
                req.files[item].mv(`public/assets/products/nepali/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                nepaliImg.push(`https://karkhana-server.onrender.com/assets/products/nepali/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`)
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
            const otherDirectory = fs.existsSync(`public/assets/products/others/${productName.toLowerCase()}`);
            fs.mkdirSync(`public/assets/products/others/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                req.files[item].mv(`public/assets/products/others/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                otherImg.push(`https://karkhana-server.onrender.com/assets/products/others/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`)
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
            const toeRingDirectory = fs.existsSync(`public/assets/products/toe rings/${productName.toLowerCase()}`);
            if (toeRingDirectory){
                return res.json({ status: 'product exist' });
            }
            fs.mkdirSync(`public/assets/products/toe rings/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                req.files[item].mv(`public/assets/products/toe rings/${productName}/${item.toLowerCase()}.jpg`);
                toeRingImg.push(`https://karkhana-server.onrender.com/assets/products/toe rings/${productName}/${item.toLowerCase()}.jpg`)
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
            const topSellerDirectory = fs.existsSync(`public/assets/products/top seller/${productName.toLowerCase()}`)
            if (topSellerDirectory){
                return res.json({ statu: 'product exist' });
            }
            fs.mkdirSync(`public/assets/products/top seller/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                req.files[item].mv(`public/assets/products/topSeller/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                topSellerImg.push(`https://karkhana-server.onrender.com/assets/products/topSeller/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`)
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
            const trendingDirectory = fs.existsSync(`public/assets/products/trending/${productName.toLowerCase()}`);
            if (trendingDirectory){
                return res.json({ status: 'product exist' });
            }
            fs.mkdirSync(`public/assets/products/trending/${productName.toLowerCase()}`);

            //storing image
            Object.keys(req.files).forEach(item => {
                req.files[item].mv(`public/assets/products/trending/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`);
                trendingImg.push(`https://karkhana-server.onrender.com/assets/products/trending/${productName.toLowerCase()}/${item.toLowerCase()}.jpg`)
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
