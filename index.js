const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');

//schemas
const registerSchema = require('./Schemas/schema').registerSchema;
const productSchema = require('./Schemas/schema').products;

//model
const registerModel = mongoose.model('registeredUser', registerSchema);
const productsModel = mongoose.model('featuredProducts', productSchema);
const earRingsModel = mongoose.model('earRings', productSchema);
const fingerRingsModel = mongoose.model('fingerRings', productSchema);
const necklaceModel = mongoose.model('necklace', productSchema);
const braceletModel = mongoose.model('bracelet', productSchema);
const toeRingsModel = mongoose.model('toeRings', productSchema);
const nepaliModel = mongoose.model('nepali', productSchema);
const comboModel = mongoose.model('combo', productSchema);

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`des ${file}`);
        cb(null, 'public/assets/users');
    },
    filename: (req, file, cb) => {
        console.log(req.body);
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024
} });


app.get('/featuredProducts', async (req, res) => {
    const data = await productsModel.find({});

    if (!data) return res.json({ status: 'database not responded' });
    
    res.json({ status: 'success', data:data })
})

app.get('/products/:productId', async (req, res) => {
    const product = req.params;

    if (product.hasOwnProperty('productId')){
        const productId = product.productId;

        console.log(productId);
        
        switch(productId) {
            case "ear-rings":
                const earRing = await earRingsModel.find({});
                if (!earRing) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: earRing });

            case "finger-rings":
                const fingerRing = await fingerRingsModel.find({});
                if (!fingerRing) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: fingerRing });

            case "toe-rings":
                const toeRing = await toeRingsModel.find({});
                if (!toeRing) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: toeRing })

            case "bracelet":
                const bracelet = await braceletModel.find({});
                if (!bracelet) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: bracelet })

            case "necklace":
                const necklace = await necklaceModel.find({});
                if (!necklace) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: necklace })

            case "nepali":
                const nepali = await nepaliModel.find({});
                if (!nepali) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: nepali })

            case "combo":
                const combo = await necklaceModel.find({});
                if (!combo) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: combo })

            case "others":
                const others = await othersModel.find({});
                if (!others) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: others })

            default:
                return res.json({ status: 'not found' });
        }
    }
})

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    const existUser = await registerModel.findOne({email});

    if (existUser) return res.json({ status: 'user exist' })

    const encryptedPass = await bcrypt.hash(password, salt);

    registerModel.create({
        firstName, lastName, email, phoneNumber, password:encryptedPass
    }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'error' }))

})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userQuery = await registerModel.findOne({ email });

    if (!userQuery) return res.json({ status: 'user not found' })

    const matchPassword = await bcrypt.compare(password, userQuery.password);

    if (!matchPassword) {
        return res.json({ status: "password doesn't match" })
    }
    else {
        return res.json({ status: 'success', user: userQuery });
    }
})


app.post('/update-profile', upload.single('avatar') ,async (req, res) => {

    const userData = JSON.parse(req.body.data);
    const email = userData.email;

    //Not necessary but maybe
    if (!email) return res.json({ status: 'email not provided' });
    
    //change filename
    if (req.file) {
        const fileNames = req.file.originalname;
        // const fileName = fileNames.split('.')[0]
        const fileExt = fileNames.split('.')[1]
        
        fs.rename(`public/assets/users/${fileNames}`, `public/assets/users/${email}.${fileExt}`, (err) => {
            if (err) return res,json({ status: 'file upload error' });
        })

        //update the database with the img link
        await registerModel.collection.updateOne({
            email: email
        }, {
            $set: {
                imgLink: userData.imgLink
            }
        }).then(result => console.log(result)).catch(err => console.log(err))
    }
    
    //update user information
    const user = await registerModel.findOne({ email });

    if (!user) return res.json({ status: 'email not found' })

    if (userData.newpassword){
        //update everything with password
        const passwordMatch = await bcrypt.compare(userData.currentpassword, user.password)
        
        if (!passwordMatch) return res.json({ status: 'invalid password' });

        const newPassword = await bcrypt.hash(userData.newpassword, salt);

        registerModel.collection.updateMany({
            email: email
        }, {
            $set: {
                firstName: userData.firstname,
                lastName: userData.lastname,
                phoneNumber: userData.phonenumber,
                password: newPassword,
                state: userData.state,
                city: userData.city,
                address: userData.address,
                zipcode: userData.zipcode,
                thana: userData.thana
            }
        }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'error' }));
    }
    else {
        //update everything except password
        registerModel.collection.updateMany({
            email: email
        }, {
            $set: {
                firstName: userData.firstname,
                lastName: userData.lastname,
                phoneNumber: userData.phonenumber,
                state: userData.state,
                city: userData.city,
                address: userData.address,
                zipcode: userData.zipcode,
                thana: userData.thana
            }
        }).then(result => res.json({ status: 'success' })).catch(err => res.json({ status: 'errpr' }))
    }
})

app.post('/redirect-user', async (req, res) => {
    const {email} = req.body;
    console.log(email);
    const user = await registerModel.findOne({ email });
    console.log(user);

    if (!user) {
        return res.json({ status: 'error' });
    }
    
    return res.json({ status: 'success', user: user });

})

app.get('/featured-products', (req, res) => {
    productsModel.find({}, {_id: 0, featured: 1}).then(result => res.json({ status: 'success', products: result[0] })).catch(err => console.log(err));
})

app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => console.log('database connected')).catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))

    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    // })
}

// const t = [
//     {name: 'Combo 1', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo1.jpg', price: 1000}
//     ,
//     {name: 'Combo 2', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo2.jpg', price: 1100}
//     ,
//     {name: 'Combo 3', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo3.jpg', price: 1200}
//     , 
//     {name: 'Combo 4', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo4.jpg', price: 1300}
//     , 
//     {name: 'Combo 5', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo5.jpg', price: 1400}
//     , 
//     {name: 'Combo 6', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo6.jpg', price: 1500}
//     , 
//     {name: 'Combo 7', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo7.jpg', price: 1600}
//     , 
//     {name: 'Combo 8', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo8.jpg', price: 1700}
//     , 
//     {name: 'Combo 9', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo9.jpg', price: 1100}
//     , 
//     {name: 'Combo 10', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo10.jpg', price: 1500}
//     , 
//     {name: 'Combo 11', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo11.jpg', price: 1300}
//     ,
//     {name: 'Combo 12', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo12.jpg', price: 1900}
//     ,
//     {name: 'Combo 13', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo13.jpg', price: 2000}
//     ,
//     {name: 'Combo 14', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo14.jpg', price: 1100}
//     ,
//     {name: 'Combo 15', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo15.jpg', price: 1600}
//     ,
//     {name: 'Combo 16', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo16.jpg', price: 1300}
//     ,
//     {name: 'Combo 17', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo17.jpg', price: 1500}
//     ,
//     {name: 'Combo 18', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo18.jpg', price: 1200}
//     ,
//     {name: 'Combo 19', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo19.jpg', price: 1900}
//     ,
//     {name: 'Combo 20', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo20.jpg', price: 2500}
//     ,
//     {name: 'Combo 21', img: 'https://karkhana-server.onrender.com/assets/products/combo/combo21.jpg', price: 3000}
// ]

// t.map(async item => {
//     return await comboModel.create({
//         name: item.name,
//         img: item.img,
//         price: item.price
//     })
// })

const port = process.env.PORT

app.listen(port || '8000', (err) => {
    if (!err){
        console.log('server running on 8000')
    }
    else console.log(err);
})