var express = require('express');
var router = express.Router();
let productModel = require('../models/product')


router.post('/product', async function(req, res, next) {
try {
    const { product_name, price, amount} = req.body;
    let newProduct = new productModel({
        product_name: product_name,
        price: price,
        amount: amount,
        order: 0
    });

    let product = await newProduct.save();
    return res.status(201).send({
        data: product,
        message: "created successfully",
        success: true,
    });
} catch (error) {
    return res.status(500).send({
        message: "created failed",
        success: false,
    });
}
});
module.exports = router;


router.get('/product', async function(req, res, next) {
    try{
        let product = await productModel.find();
        return res.status(200).send({
            data: product,
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


    router.get('/product/:id', async function(req, res, next) {
        try{
            let id = req.params.id
            let product = await productModel.findById(id);
            return res.status(200).send({
                data: product,
                message: 'id Invalid',
                success: true,
            });
        } catch (error) {
            return res.status(500).send({
                message: "server error: ",
                success: false,
            });
        }
    });
        module.exports = router;

        router.put('/product/:id', async function(req, res, next) {
            try{
                let id = req.params.id
                let { product_name, price, amount} = req.body;
                await productModel.findByIdAndUpdate(id, {
                    product_name: product_name,
                    price: price,
                    amount: amount
    
                })
                let product = await productModel.findById(id);
                return res.status(200).send({
                data: product,
                message: 'id Invalid',
                success: true,
            });
            } catch (error) {
                return res.status(500).send({
                    message: "server error: ",
                    success: false,
                });
            }
        });
            module.exports = router;

            router.delete('/product/:id', async function(req, res, next) {
                try{
                    let id = req.params.id
                    let { product_name, price, amount} = req.body;
                    // console.log(id)
                    await productModel.findByIdAndDelete(id, {
                        product_name: product_name,
                        price: price,
                        amount: amount
        
                    })
                    // next();
                    let product = await productModel.find();
                    return res.status(200).send({
                    data: product,
                    message: 'success',
                    success: true
                });
                } catch (error) {
                    return res.status(500).send({
                        message: "server error: ",
                        success: false,
                    });
                }
            });
                module.exports = router;
        