const registerSchema = {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    password: {type: String, required: true}
}

const products = {
    featured: Object
}


module.exports = {
    registerSchema, products
}