const mongoose = require('mongoose')
const order = new mongoose.Schema({
    order_name: String,
    product_name: String,

});

module.exports = mongoose.model('order', order);