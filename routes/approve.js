var express = require('express');
var router = express.Router();
let userSchema = require('../models/user.model')
// const bcrypt = require('bcrypt')



router.put('/approve/:id', async function(req, res, next) {
    try{
        let id = req.params.id
        let ap = "approved"
        await userSchema.findByIdAndUpdate(id, {
            status: ap
        })
        // next();
        let Status = await userSchema.findById(id);
        return res.status(200).send({
        data: Status,
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