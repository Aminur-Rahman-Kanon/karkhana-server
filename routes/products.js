const express = require('express');
const router = express.Router({ mergeParams: true });
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//models
const featured = require('../Schemas/schema').featuredModel;
const exclusive = require('../Schemas/schema').exclusiveModel;
const trending = require('../Schemas/schema').trendingModel;
const topSeller = require('../Schemas/schema').topSellerModel;
const bracelet = require('../Schemas/schema').braceletModel;
const fingerRing = require('../Schemas/schema').fingerRingsModel;
const earRing = require('../Schemas/schema').earRingsModel;
const necklace = require('../Schemas/schema').necklaceModel;
const toeRing = require('../Schemas/schema').toeRingsModel;
const nepali = require('../Schemas/schema').nepaliModel;
const other = require('../Schemas/schema').othersModel;
const latest = require('../Schemas/schema').latestModel;
const combo = require('../Schemas/schema').comboModel;


router.get('/', async (req, res) => {
    const product = req.params;

    console.log(product);

    if (product.hasOwnProperty('productId')){
        const productId = product.productId;
        
        switch(productId) {
            case 'get-products':
                const featuredProduct = await featured.find({});
                const exclusiveProduct = await exclusive.find({});
                const trendingProduct = await trending.find({});
                const topSellerProduct = await topSeller.find({});
                const bracelets = await bracelet.find({});
                const fingerRingProduct = await fingerRing.find({});
                const earRingProduct = await earRing.find({});
                const necklaces = await necklace.find({});
                const toeRingProduct = await toeRing.find({});
                const nepalis = await nepali.find({});
                const otherItem = await other.find({});
                const combos = await combo.find({});
                const latestItem = await latest.find({});

                const product = [...featuredProduct, ...exclusiveProduct, ...trendingProduct, ...topSellerProduct,
                ...bracelets, ...fingerRingProduct, ...earRingProduct, ...necklaces, ...toeRingProduct, ...nepalis, ...otherItem,
                ...combos, ...latestItem];

                return res.json({ status: 'success', data: product });

            case 'initial-display':
                const featuredItem = await featured.find({});
                const exclusiveItem = await exclusive.find({});
                const trendingItem = await trending.find({});
                const topSellerItem = await topSeller.find({});
                
                return res.json({ status: 'success', data:{ featuredItem, exclusiveItem, trendingItem, topSellerItem } })

            case "Ear Ring":
                const earRings = await earRing.find({});
                if (!earRings) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: earRings });

            case "Finger Ring":
                const fingerRings = await fingerRing.find({});
                if (!fingerRings) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: fingerRings });

            case "Toe Ring":
                const toeRings = await toeRing.find({});
                if (!toeRings) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: toeRings })

            case "Bracelet":
                const braceletItem = await bracelet.find({});
                if (!braceletItem) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: braceletItem })

            case "Necklace":
                const necklaceItem = await necklace.find({});
                if (!necklaceItem) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: necklaceItem })

            case "Nepali":
                const nepaliItem = await nepali.find({});
                if (!nepaliItem) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: nepaliItem })

            case "Combo":
                const comboItem = await combo.find({});
                if (!comboItem) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: comboItem })

            case "Other":
                const others = await other.find({});
                if (!others) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: others })
            
            case "Featured":
                const featuredProducts = await featured.find({});
                if (!featuredProducts) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: featuredProducts });

            case "Trending":
                const trendingProducts = await trending.find({});
                if (!trendingProducts) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: trendingProducts });

            case "Top Seller":
                const topSellerProducts = await topSeller.find({});
                if (!topSellerProducts) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: topSellerProducts });

            case "Latest":
                const latestProducts = await latest.find({});
                if (!latestProducts) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: latestProducts });

            case "Exclusive":
                const exclusiveProducts = await exclusive.find({});
                const products = await other.find({});
                const totalItem = exclusiveProducts.concat(products);
                if (!exclusiveProducts || !products) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: totalItem })

            default:
                return res.json({ status: 'not found' });
        }
    }
})

module.exports = router;