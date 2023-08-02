const mongo = require('mongoose')

const productSchema = mongo.Schema({
    name: String,
    category:String,
    image:String,
    description: String,
    price:Number,
})
const productModel = mongo.model('product', productSchema)
module.exports = productModel