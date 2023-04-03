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
    name: String,
    img: String,
    price: String,
    details: String
}



module.exports = {
    registerSchema, products
}