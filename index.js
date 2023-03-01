const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const bodyParser = require('body-parser');
const multer = require('multer');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const path = require('path');

//schemas
const registerSchema = require('./Schemas/schema').registerSchema;
const productSchema = require('./Schemas/schema').products;

//model
const registerModel = mongoose.model('registeredUser', registerSchema);
const productsModel = mongoose.model('products', productSchema);

//multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`des ${file}`);
        cb(null, 'Images');
    },
    filename: (req, file, cb) => {
        console.log(`file ${file}`);
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage}).single('image')

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

app.post('/upload', (req, res) => {
    console.log(req.file);
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            res.send('error')
        }
        res.send(req.file);
    })
})

app.get('/featured-products', (req, res) => {
    productsModel.find({}, {_id: 0, featured: 1}).then(result => res.json({ status: 'success', products: result[0] })).catch(err => console.log(err));
})

app.use(express.static('Images'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => console.log('database connected')).catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('Images'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT

app.listen(port || '8000', (err) => {
    if (!err){
        console.log('server running on 8000')
    }
    else console.log(err);
})