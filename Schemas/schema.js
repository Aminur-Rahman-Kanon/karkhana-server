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
    featured: Object
}


module.exports = {
    registerSchema, products
}