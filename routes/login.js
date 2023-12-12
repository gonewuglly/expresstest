var express = require('express');
var router = express.Router();
let userSchema = require('../models/user.model')
const bcrypt = require('bcrypt')

router.post('/login', async function(req, res, next) {
    try {
    let { username, password } = req.body;
    let user = await userSchema.findOne({ 
        username: username,
        status: 'approved'
    });
    if(!user) {
    return res.status(500).send({
        message: "รอ approved  ",
        success: false,
    });
}
const checkPassword = await bcrypt.compare(password, user.password);
if(!checkPassword) {
    return res.status(500).send({
        message: "login ไม่สำเร็จ รหัสผ่านไม่ถูกต้อง",
        success: false,
    });
}
const {_id, firstName, lastName, email } = user;
return res.status(200).send({
    data: {_id,  firstName, lastName, email},
    message: "login เข้าสู่ระบบสำเร็จ",
    success: true,
    });
} catch (error) {
    return res.status(500).send({
        message: "login เข้าสู่ระบบไม่สำเร็จ",
        success: false,
    });
}
});

  module.exports = router;
  