
var express = require('express');
var router = express.Router();
let orderModel = require('../models/order')
let productModel = require('../models/product')


router.get('/orders', async function(req, res, next) {
    try{
        let order = await orderModel.find();
        return res.status(200).send({
            data: order,
            message: 'success',
            success: true
        });
    } catch (error) {
        return res.status(500).send({
            message: 'server error',
            success: false,
        });
    }
    });
    
    module.exports = router;

    
router.get('/order/:id/', async function(req, res, next) {
    try {
        let id = req.params.id
        const order = await orderModel.findById(id)
        const prod = order.order_name
        if( prod != null ){
            const order1 = await orderModel.find({
                order_name : prod
            })
            return res.status(200).send({
                data: order1,
                message: 'success',
                success: true
            });
        } else{
            console.log('error')
        }
    } catch (error) {
        return res.status(500).send({
            message: "created failed",
            success: false,
        });
    }
    })
    module.exports = router;



router.post('/order/:id/', async function(req, res, next) {
try {
    let id = req.params.id
    const product = await productModel.findById(id)
    let newOrder = new orderModel({
        order_name: id,
        product_name: product.product_name,
    });
    await newOrder.save();
    order_id = newOrder._id
    const order = await orderModel.findById(order_id )
    const prod = order.order_name
    const product1 = await productModel.findById(prod)
    if( prod != null ){
        const order1 = await orderModel.find({
            order_name : prod
        })
        qty_order = order1.length
        // console.log(qty_order)
        await productModel.findByIdAndUpdate(product1._id, {
            order: qty_order
        })
        const product2 = await productModel.findById(product1._id)
        if(product2.amount > 0) {
            am = product2.amount
            pd = 1
            amount_qty = (am - pd)
            await productModel.findByIdAndUpdate(product2._id, {
                amount: amount_qty
            })
            return res.status(200).send({ message: 'เพิ่มออเดอร์สำเร็จ',
                data: product2,
                message: 'success'
            });
        }else if(product2.amount == 0){
            return res.status(200).send({ message: 'ไม่สามารถสั่งออเดอร์เกินกว่าจำสวนสต๊อกได้',
                success: false ,
                
            });
        }
        return res.status(200).send({
            data: product2,
            message: 'success',
            success: true
        });
    } else{
        console.log('error')
    }
} catch (error) {
    return res.status(500).send({
        message: "created failed",
        success: false,
    });
}
})

module.exports = router;