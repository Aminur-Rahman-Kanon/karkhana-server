const mongoose = require('mongoose');

const registerSchema = {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    imgLink: String,
    password: {type: String, required: true},
    state: String,
    city: String,
    address: String,
    zipcode: String,
    thana: String,
}

const products = {
    category: String,
    rating: Number,
    name: String,
    img: Array,
    price: String,
    quantity: Number,
    details: String
}

const blog = {
    img: String,
    title: String,
    date: String,
    details: String
}

const registerModel = mongoose.model('registeredUser', registerSchema);
const featuredModel = mongoose.model('featuredProducts', products);
const earRingsModel = mongoose.model('earRings', products);
const fingerRingsModel = mongoose.model('fingerRings', products);
const necklaceModel = mongoose.model('necklace', products);
const braceletModel = mongoose.model('bracelet', products);
const toeRingsModel = mongoose.model('toeRings', products);
const nepaliModel = mongoose.model('nepali', products);
const comboModel = mongoose.model('combo', products);
const othersModel = mongoose.model('other', products);
const exclusiveModel = mongoose.model('exclusive', products);
const trendingModel = mongoose.model('trending', products);
const topSellerModel = mongoose.model('topSeller', products);
const latestModel = mongoose.model('latest', products);
const blogModel = mongoose.model('blog', blog);

module.exports = {
    registerModel,
    featuredModel,
    earRingsModel,
    fingerRingsModel,
    necklaceModel,
    braceletModel,
    toeRingsModel,
    nepaliModel,
    comboModel,
    othersModel,
    exclusiveModel,
    trendingModel,
    topSellerModel,
    latestModel,
    blogModel
}