
var express = require('express');
var router = express.Router();
let orderModel = require('../models/order')
let productModel = require('../models/product')


router.get('/test/:id/', async function(req, res, next) {
    let id = req.params.id
    const order = await orderModel.findById(id)
    const prod = order.order_name
    console.log(prod)
    const product = await productModel.findById(prod)
    console.log(product._id)
    if( prod == product._id ){
        const order1 = await orderModel.find({
            order_name : prod
        })
        console.log(order1)
        return res.status(200).send({
            data: order1,
            message: 'success',
            success: true
        });
    } else{
        console.log('error')
    }
})
module.exports = router;
