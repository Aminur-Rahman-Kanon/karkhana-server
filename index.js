const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './public/views');
app.set('view engine', 'ejs');
app.use(fileUpload());

const product = require('./Schemas/schema').trendingModel;

// product.find({}).then(res => console.log(res.length))

// const update = async () => {
//     for (let i=0; i<12; i++){
//         const img = [];
//         //query product
//         for (let j=0; j<4; j++){
//             img.push(`https://karkhana-server.onrender.com/assets/products/trending/trending${i+1}/trending${j+1}.jpg`)
//         }
        
//         await product.updateOne({
//             name: `Trending ${i+1}`
//         }, {
//             $set: {
//                 img: img
//             }
//         })
//     }
// }

// update();

//imported route
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const productsRoute = require('./routes/products');
const forgotPassword = require('./routes/forgotPassword');
const resetPassword = require('./routes/resetPassword');
const confirmResetPassword = require('./routes/confirmResetPassword');
const getBlog = require('./routes/blog');
const updateProfile = require('./routes/updateProfile');
const updateRedirect = require('./routes/updateRedirect');
const addProducts = require('./routes/addProducts');

//routes
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/products/:productId', productsRoute);
app.use('/forgot-password', forgotPassword);
app.use('/reset-password/:id/:token', resetPassword);
app.use('/reset-password/:id/:token', confirmResetPassword);
app.use('/get-blogs', getBlog);
app.use('/update-profile', updateProfile);
app.use('/redirect-user', updateRedirect);
app.use('/add-products', addProducts);

app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => console.log('database connected')).catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
}

const port = process.env.PORT

app.listen(port || '8000', (err) => {
    if (!err){
        console.log('server running on 8000')
    }
    else console.log(err);
})

