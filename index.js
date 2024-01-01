const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { cronJobs } = require('./utilities/utilities')
app.use(cors({origin: ['https://karkhana.onrender.com', 'http://localhost:3000']}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './public/views');
app.set('view engine', 'ejs');

//imported route
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const products = require('./routes/products');
const forgotPassword = require('./routes/forgotPassword');
const resetPassword = require('./routes/resetPassword');
const confirmResetPassword = require('./routes/confirmResetPassword');
const updateProfile = require('./routes/updateProfile');
const updateRedirect = require('./routes/updateRedirect');
const submitPayment = require('./routes/submitPayment');
const updateUserProductsPurchase = require('./routes/updateUserProductsPurchase');
const fetchProduct = require('./routes/fetchProduct');

//routes
app.get('/', (req, res) => {
    return res.status(200);
})

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/products/:productId', products);
app.use('/forgot-password', forgotPassword);
app.use('/reset-password/:id/:token', resetPassword);
app.use('/reset-password/:id/:token', confirmResetPassword);
app.use('/update-profile', updateProfile);
app.use('/redirect-user', updateRedirect);
app.use('/submit-payment', submitPayment);
app.use('/update-user-purchased-item', updateUserProductsPurchase);
app.use('/product/:category', fetchProduct);

//establising database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => console.log('database connected')).catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
}

//defining a cronjobs to keep server awake
cronJobs();

//define a port for server to listening
const port = process.env.PORT
app.listen(port || '8000', (err) => {
    if (!err){
        console.log('server running on 8000')
    }
    else console.log(err);
})

