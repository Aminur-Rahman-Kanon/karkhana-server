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
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
app.set('views', './public/views');
app.set('view engine', 'ejs');
const path = require('path');

//schemas
const registerSchema = require('./Schemas/schema').registerSchema;
const productSchema = require('./Schemas/schema').products;
const blogSchema = require('./Schemas/schema').blog;

//model
const registerModel = mongoose.model('registeredUser', registerSchema);
const featuredModel = mongoose.model('featuredProducts', productSchema);
const earRingsModel = mongoose.model('earRings', productSchema);
const fingerRingsModel = mongoose.model('fingerRings', productSchema);
const necklaceModel = mongoose.model('necklace', productSchema);
const braceletModel = mongoose.model('bracelet', productSchema);
const toeRingsModel = mongoose.model('toeRings', productSchema);
const nepaliModel = mongoose.model('nepali', productSchema);
const comboModel = mongoose.model('combo', productSchema);
const othersModel = mongoose.model('other', productSchema);
const exclusiveModel = mongoose.model('exclusive', productSchema);
const trendingModel = mongoose.model('trending', productSchema);
const topSellerModel = mongoose.model('topSeller', productSchema);
const latestModel = mongoose.model('latest', productSchema);
const blogModel = mongoose.model('blog', blogSchema);

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


app.get('/products/:productId', async (req, res) => {
    const product = req.params;

    if (product.hasOwnProperty('productId')){
        const productId = product.productId;
        
        switch(productId) {
            case 'get-products':
                const featuredProduct = await featuredModel.find({});
                const exclusiveProduct = await exclusiveModel.find({});
                const trendingProduct = await trendingModel.find({});
                const topSellerProduct = await topSellerModel.find({});
                const bracelets = await braceletModel.find({});
                const fingerRingProduct = await fingerRingsModel.find({});
                const earRingProduct = await earRingsModel.find({});
                const necklaces = await necklaceModel.find({});
                const toeRingProduct = await toeRingsModel.find({});
                const nepalis = await nepaliModel.find({});
                const other = await othersModel.find({});
                const combos = await comboModel.find({});
                const latest = await latestModel.find({});

                const product = await [...featuredProduct, ...exclusiveProduct, ...trendingProduct, ...topSellerProduct,
                ...bracelets, ...fingerRingProduct, ...earRingProduct, ...necklaces, ...toeRingProduct, ...nepalis, ...other,
                ...combos, ...latest];

                return res.json({ status: 'success', data: product });

            case 'initial-display':
                const featured = await featuredModel.find({});
                const exclusive = await exclusiveModel.find({});
                const trending = await trendingModel.find({});
                const topSeller = await topSellerModel.find({});

                // if (!featured || !exclusive) return res.json({ status: 'database not responded' });
                return res.json({ status: 'success', data:{ featured, exclusive, trending, topSeller } })

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
                const combo = await comboModel.find({});
                if (!combo) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: combo })

            case "others":
                const others = await othersModel.find({});
                if (!others) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: others })
            
            case "featured":
                const featuredProducts = await featuredModel.find({});
                if (!featuredProducts) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: featuredProducts });

            case "trending":
                const trendingProducts = await trendingModel.find({});
                if (!trendingProducts) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: trendingProducts });

            case "top-seller":
                const topSellerProducts = await topSellerModel.find({});
                if (!topSellerProducts) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: topSellerProducts });

            case "latest":
                const latestProducts = await latestModel.find({});
                console.log(latestProducts);
                if (!latestProducts) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: latestProducts });

            case "exclusive":
                const exclusiveProducts = await exclusiveModel.find({});
                const products = await othersModel.find({});
                const totalItem = exclusiveProducts.concat(products);
                if (!exclusiveProducts || !products) return res.json({ status: 'database error' });
                return res.json({ status: 'success', data: totalItem })

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

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    const userCheck = await registerModel.findOne({ email });
    if (!userCheck) return res.json({ status: 'user not found' })

    const token = jwt.sign({ id: userCheck._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    const link = `https://karkhana-server.onrender.com/reset-password/${userCheck._id}/${token}`;

    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'karkhanawebservice@gmail.com',
              pass: 'ivlqywmzjmhbjzeo'
            }
        });
        
        const mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Reseting the password',
        text: `Here is the link to reset your password. Please note that this link is valid for 5 minutes. After 5 minutes it will not work, then you have to try again.
        \n${link}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });

        return res.json({ status: 'success' })
        
    } catch (error) {
        return res.json({ status: 'failed' })
    }
})

app.get('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    
    const userCheck = await registerModel.findOne({ _id: id });
    if (!userCheck) return res.json({ status: 'user not found' });

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        res.render('index', {email: userCheck.email})
    } catch (error) {
        res.send("Link expired. Please try again")
    }
})

app.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;

    const {password, confirmPassword} = req.body;
    
    const userCheck = await registerModel.findOne({ _id: id });

    if (!userCheck) return res.json({ status: 'user not found' });

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verify);
        const encryptedPassword = await bcrypt.hash(password, salt);
        await registerModel.updateOne({
            _id: id
        },
        {
            $set: {
                password: encryptedPassword
            }
        })
        res.render("success");
        
    } catch (error) {
        res.json({ status: 'something went wrong' })
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

app.get('/get-blogs', async (req, res) => {
    const blogs = await blogModel.find({});
    if (!blogs) return res.json({ status: 'failed' })
    
    return res.json({ status: 'success', data: blogs });
})

// app.get('/featured-products', (req, res) => {
//     featuredModel.find({}, {_id: 0, featured: 1}).then(result => res.json({ status: 'success', products: result[0] })).catch(err => console.log(err));
// })

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
//     {category: 'others', rating: 2, name: 'Other 1', img: 'https://karkhana-server.onrender.com/assets/products/others/other1.jpg', price: '1200', quantity: 10, details: 'Laboris veniam mollit irure ut do pariatur excepteur.'}
//     ,
//     {category: 'others', rating: 4, name: 'Other 2', img: 'https://karkhana-server.onrender.com/assets/products/others/other2.jpg', price: '1300', quantity: 5, details: 'Non do enim laborum veniam tempor dolor aliquip eiusmod nulla pariatur aliquip duis veniam.'}
//     , 
//     {category: 'others', rating: 5, name: 'Other 3', img: 'https://karkhana-server.onrender.com/assets/products/others/other3.jpg', price: '1400', quantity: 6, details: 'Lorem amet sint proident laborum.'}
//     ,
//     {category: 'others', rating: 3, name: 'Other 4', img: 'https://karkhana-server.onrender.com/assets/products/others/other4.jpg', price: '1000', quantity: 7, details: 'Ipsum eu ad laboris consectetur reprehenderit dolore Lorem id aute anim aliqua Lorem cupidatat.'}
//     , 
//     {category: 'others', rating: 4, name: 'Other 5', img: 'https://karkhana-server.onrender.com/assets/products/others/other5.jpg', price: '1700', quantity: 8, details: 'Culpa aute ea exercitation quis fugiat nisi commodo adipisicing nisi irure.'}
//     , 
//     {category: 'others', rating: 5, name: 'Other 6', img: 'https://karkhana-server.onrender.com/assets/products/others/other6.jpg', price: '1100', quantity: 9, details: 'Culpa quis nisi mollit est ullamco aute.'}
//     , 
//     {category: 'others', rating: 3, name: 'Other 7', img: 'https://karkhana-server.onrender.com/assets/products/others/other7.jpg', price: '1500', quantity: 8, details: 'Ut adipisicing qui fugiat veniam.'}
//     ,
//     {category: 'others', rating: 3, name: 'Other 8', img: 'https://karkhana-server.onrender.com/assets/products/others/other8.jpg', price: '1300', quantity: 2, details: 'Anim sint laborum sit anim enim et pariatur laboris ut aliqua cupidatat do proident pariatur.'}
//     , 
//     {category: 'others', rating: 3, name: 'Other 9', img: 'https://karkhana-server.onrender.com/assets/products/others/other9.jpg', price: '1100', quantity: 1, details: 'Veniam id qui dolore in eiusmod aliqua exercitation aliqua laboris fugiat ea consequat.'}
//     , 
//     {category: 'others', rating: 1, name: 'Other 10', img: 'https://karkhana-server.onrender.com/assets/products/others/other10.jpg', price: '1200', quantity: 12, details: 'Et cupidatat proident velit ut sunt cupidatat fugiat ea cillum labore irure.'}
// ]

// const blog = [
//     {title: 'Veniam proident aliquip ipsum ut mollit est adipisicing consequat.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog1.jpg',
//      date: '10/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Sunt officia officia magna excepteur ad reprehenderit occaecat molsa.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog2.jpg',
//      date: '13/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Aliquip consectetur exercitation laboris occaecat exercitation tempor.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog3.jpg',
//      date: '14/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Eiusmod consequat Lorem eu veniam reprehenderit.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog4.jpg',
//      date: '15/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Aute minim ad magna magna anim ad cupidatat commodo labore id sit sunt irure nisi.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog5.jpg',
//      date: '17/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Consequat eu ullamco amet ex consectetur voluptate.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog6.jpg',
//      date: '18/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Non voluptate Lorem sit excepteur.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog7.jpg',
//      date: '19/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Reprehenderit labore laboris culpa tempor excepteur laboris pariatur aliqua.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog8.jpg',
//      date: '20/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Deserunt elit est velit ad consectetur.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog9.jpg',
//      date: '22/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Fugiat Lorem reprehenderit proident voluptate esse nisi cillum ex.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog10.jpg',
//      date: '23/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Magna nulla est laboris irure tempor ad proident ex qui in adipisicing quis est veniam.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog11.jpg',
//      date: '25/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Anim aute proident sint laborum proident cillum non Lorem ex dolor enim tempor esse.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog12.jpg',
//      date: '26/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Culpa pariatur elit amet exercitation non labore sit ea proident.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog13.jpg',
//      date: '28/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Lorem veniam incididunt ullamco enim cillum anim esse ullamco cupidatat enim.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog14.jpg',
//      date: '1/03/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Laboris officia ea eu qui ut sunt dolore incididunt aute amet quis do ex consectetur.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog15.jpg',
//      date: '3/03/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Nisi cupidatat eu officia labore laboris fugiat exercitation.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog16.jpg',
//      date: '5/02/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Labore culpa consectetur et id aute eu esse.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog17.jpg',
//      date: '7/03/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Cupidatat ad sit adipisicing magna duis duis.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog18.jpg',
//      date: '9/03/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Do minim ex voluptate deserunt.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog19.jpg',
//      date: '10/03/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
//     ,
//     {title: 'Mollit excepteur adipisicing veniam sunt consectetur est aliquip incididunt dolor incididunt nulla exercitation.',
//      img: 'https://karkhana-server.onrender.com/assets/products/blog/blog20.jpg',
//      date: '15/04/23',
//      details: "Proident tempor cupidatat duis voluptate aute id veniam aliqua commodoeu consectetur.Minim dolore culpa quis laboris cillum dolor eiusmod anim esse labore pariatur.Amet mollit ut Lorem occaecat veniam.Labore commodo do consectetur reprehenderit dolor amet.Mollit ipsum adipisicing velit dolor ullamco commodo laborum cillum."
//     }
// ]

// blog.map(async item => {
//     await blogModel.create({
//         title: item.title,
//         img: item.img,
//         date: item.date,
//         details: item.details
//     })
// })

// t.map(async item => {
//     return await exclusiveModel.create({
//         category: item.category,
//         rating: item.rating,
//         name: item.name,
//         img: item.img,
//         price: item.price,
//         quantity: item.quantity,
//         details: item.details
//     })
// })

const port = process.env.PORT

app.listen(port || '8000', (err) => {
    if (!err){
        console.log('server running on 8000')
    }
    else console.log(err);
})