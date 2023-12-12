var express = require('express');
var router = express.Router();
let userSchema = require('../models/user.model')
const bcrypt = require('bcrypt')

router.post('/register', async function(req, res, next) {
    try {
    let { username, password, firstName, lastName, email, status } = req.body;
    let hashPassword = await bcrypt.hash(password,10);
    console.log(hashPassword)
    const newUser = new userSchema({
      username,
      password: hashPassword,
      firstName,
      lastName,
      email,
      status: 'unapproved'
    });
    const user = await newUser.save();
    return res.status(200).send({
      data: { _id: user._id, username, firstName, lastName, email, status},
      message: "สมัครสมาชิกสำเร็จ",
      success:true
   });
  } catch (error) {
    res.send('error');
  }
  });
  module.exports = router;
  